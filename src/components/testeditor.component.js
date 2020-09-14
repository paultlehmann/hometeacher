import React, { Component } from "react";
import axios from "axios";

export default class TestEditor extends Component {
    constructor(props) {
        super(props);

        this.onSetName = this.onSetName.bind(this);
        this.onSetQuestionArray = this.onSetQuestionArray.bind(this);
        this.onSetType = this.onSetType.bind(this);
        this.onSetTeacher = this.onSetTeacher.bind(this);
        this.onSetStudent = this.onSetStudent.bind(this);
        this.onSetIsComplete = this.onSetIsComplete.bind(this);
        this.onSetGrade = this.onSetGrade.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: "",
            questionArray: "",
            type: "test",
            teacher: "5f496fff8e7faa21e4288169",
            student: "5f496f568e7faa21e4288168",
            isComplete: false,
            grade: undefined
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

    onSetType(e) {
        this.setState({
            type: e.target.value
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

    onSubmit(e) {
        e.preventDefault();
        const test = {
            name: this.state.name,
            questionArray: this.state.questionArray,
            type: this.state.type,
            teacher: this.state.teacher,
            student: this.state.student,
            isComplete: this.state.isComplete,
            grade: this.state.grade
        };
        console.log(test);
        axios.post("http://localhost:5000/tests/add", test)
            .then(function () {
                window.location.replace("http://localhost:3000/dashboard");
            });
    }

    render() {
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
                        <label>Questions [placeholder]:</label>
                        <input type="text"
                            required
                            value={this.state.questionArray}
                            onChange={this.onSetQuestionArray}
                        />
                    </div>
                    <div className="testEditorFormField">
                        <label>Test or assignment:</label>
                        <select
                            type="text"
                            value={this.state.type}
                            onChange={this.onSetType}>
                            <option value="test">Test</option>
                            <option value="assignment">Assignment</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Save Test" />
                    </div>
                </form>
            </div>
        )
    }
}