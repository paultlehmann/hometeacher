import React, { Component } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

export default class TestEditor extends Component {
    constructor(props) {
        super(props);

        this.onSetName = this.onSetName.bind(this);
        this.onSetQuestionArray = this.onSetQuestionArray.bind(this);
        this.onSetTestType = this.onSetTestType.bind(this);
        this.onSetTeacher = this.onSetTeacher.bind(this);
        this.onSetStudent = this.onSetStudent.bind(this);
        this.onSetIsComplete = this.onSetIsComplete.bind(this);
        this.onSetGrade = this.onSetGrade.bind(this);
        this.onSubmitWithoutQuestions = this.onSubmitWithoutQuestions.bind(this);
        this.onSubmitWithQuestions = this.onSubmitWithQuestions.bind(this);
        this.onCancel = this.onCancel.bind(this);

        this.state = {
            name: "",
            questionArray: [],
            testType: "test",
            teacher: "",
            student: "",
            isComplete: false,
            grade: null,
            internalID: Math.floor(Math.random() * 1000000000),
            token: localStorage.getItem("jwtToken")
        }
    }

    onSetName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onSetQuestionArray(e) {
        this.setState({
            questionArray: e.target.value
        });
    }

    onSetTestType(e) {
        this.setState({
            testType: e.target.value
        });
    }

    onSetTeacher(e) {
        this.setState({
            teacher: e.target.value
        });
    }

    onSetStudent(e) {
        this.setState({
            student: e.target.value
        });
    }

    onSetIsComplete(e) {
        this.setState({
            isComplete: e.target.value
        });
    }

    onSetGrade(e) {
        this.setState({
            grade: e.target.value
        });
    }

    onSubmitWithoutQuestions(e) {
        e.preventDefault();
        const test = {
            name: this.state.name,
            questionArray: this.state.questionArray,
            testType: this.state.testType,
            teacher: this.state.teacher,
            student: this.state.student,
            isComplete: this.state.isComplete,
            grade: this.state.grade,
            internalID: this.state.internalID
        };
        axios.post("http://localhost:5000/tests/add", test)
            .then(function () {
                console.log("Test saved");
                window.location.replace("http://localhost:3000/dashboard");
            });
    }

    onCancel(e) {
        e.preventDefault();
        console.log("Test canceled");
        window.location.replace("http://localhost:3000/dashboard");
    }

    onSubmitWithQuestions(e) {
        e.preventDefault();
        let testID = this.state.internalID;
        const test = {
            name: this.state.name,
            questionArray: this.state.questionArray,
            testType: this.state.testType,
            teacher: this.state.teacher,
            student: this.state.student,
            isComplete: this.state.isComplete,
            grade: this.state.grade,
            internalID: this.state.internalID
        };
        axios.post("http://localhost:5000/tests/add", test)
            .then(function () {
                console.log("Adding test questions");
                window.location.replace(`http://localhost:3000/qeditor?testID=${testID}`);
            })
    }

    render() {
        console.log(this.state.token);
        let decodedToken = jwt_decode(this.state.token);
        this.state.teacher = decodedToken.id;
        console.log(decodedToken);
        console.log(this.state.teacher);
        return (
            <div>
                <h3>Create test/assignment</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="testEditorFormField">
                        <label>Name: </label>
                        <input type="text"
                            required
                            value={this.state.name}
                            onChange={this.onSetName}>
                        </input>
                    </div>
                    <div className="testEditorFormField">
                        <label>Test or assignment:</label>
                        <select
                            type="text"
                            value={this.state.testType}
                            onChange={this.onSetTestType}>
                            <option value="test">Test</option>
                            <option value="assignment">Assignment</option>
                        </select>
                    </div>
                    <div className="submitButton">
                        <button onClick={this.onSubmitWithQuestions.bind(this)}>Add Questions</button>
                    </div>
                    <div className="submitButton">
                        <button onClick={this.onSubmitWithoutQuestions.bind(this)}>Save Test</button>
                    </div>
                    <div className="submitButton">
                        <button onClick={this.onCancel.bind(this)}>Cancel</button>
                    </div>
                </form>
            </div>
        )
    }
}