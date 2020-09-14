import React, { Component } from "react";
import axios from "axios";

export default class QEditor extends Component {
    constructor(props) {
        super(props);

        this.onSetPrompt = this.onSetPrompt.bind(this);
        this.onSetRightAnswer = this.onSetRightAnswer.bind(this);
        this.onSetWrongAnswers = this.onSetWrongAnswers.bind(this);
        this.onSetGuess = this.onSetGuess.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            prompt: "",
            rightAnswer: "",
            wrongAnswers: [],
            guess: ""
        }
    }

    onSetPrompt(e) {
        this.setState({
            prompt: e.target.value
        });
    }

    onSetRightAnswer(e) {
        this.setState({
            rightAnswer: e.target.value
        });
    }

    onSetWrongAnswers(e) {
        this.setState({
            wrongAnswers: e.target.value
        });
    }

    onSetGuess(e) {
        this.setState({
            guess: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const question = {
            prompt: this.state.prompt,
            rightAnswer: this.state.rightAnswer,
            wrongAnswers: this.state.wrongAnswers,
            guess: this.state.guess
        };
        console.log(question);
        // axios.post("http://localhost:5000/questions/add", question)
        //     .then(function () {
        //         window.location.replace(`http://localhost:3000/qeditor/${test.name}`);
        //     });
    }

    render() {
        return (
            <div>
                <h3>Add a question</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="qEditorFormField">
                        <label>Prompt: </label>
                        <input type="text"
                            required
                            value={this.state.prompt}
                            onChange={this.onSetPrompt}>
                        </input>
                    </div>
                    <div className="qEditorFormField">
                        <label>Right Answer: </label>
                        <input type="text"
                            required
                            value={this.state.rightAnswer}
                            onChange={this.onSetRightAnswer}>
                        </input>
                    </div>
                    <div className="qEditorFormField">
                        <label>Prompt: </label>
                        <input type="text"
                            required
                            value={this.state.prompt}
                            onChange={this.onSetPrompt}>
                        </input>
                    </div>
                    <div className="qEditorFormField">
                        <label>Prompt: </label>
                        <input type="text"
                            required
                            value={this.state.prompt}
                            onChange={this.onSetPrompt}>
                        </input>
                    </div>
                    <div className="qEditorFormField">
                        <label>Test or assignment:</label>
                        <select
                            type="text"
                            value={this.state.testType}
                            onChange={this.onSetTestType}>
                            <option value="test">Test</option>
                            <option value="assignment">Assignment</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add Questions" />
                    </div>
                </form>
            </div>
        )
    }
}