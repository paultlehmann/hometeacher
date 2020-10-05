import React, { Component } from "react";
import axios from "axios";

export default class QEditor extends Component {

    constructor(props) {
        super(props);

        this.onSetPrompt = this.onSetPrompt.bind(this);
        this.onSetRightAnswer = this.onSetRightAnswer.bind(this);
        this.onSetWrongAnswer1 = this.onSetWrongAnswer1.bind(this);
        this.onSetWrongAnswer2 = this.onSetWrongAnswer2.bind(this);
        this.onSetWrongAnswer3 = this.onSetWrongAnswer3.bind(this);
        this.onSetGuess = this.onSetGuess.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.wrongAnswerArray = [];

        this.state = {
            prompt: "",
            rightAnswer: "",
            wrongAnswer1: "",
            wrongAnswer2: "",
            wrongAnswer3: "",
            guess: "",
            testID: ""
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

    onSetWrongAnswer1(e) {
        this.setState({
            wrongAnswer1: e.target.value
            // this.wrongAnswerArray.push(e.target.value)
        });
    }

    onSetWrongAnswer2(e) {
        this.setState({
            wrongAnswer2: e.target.value
        });
    }

    onSetWrongAnswer3(e) {
        this.setState({
            wrongAnswer3: e.target.value
        });
    }

    onSetGuess(e) {
        this.setState({
            guess: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        this.wrongAnswerArray.push(this.state.wrongAnswer1);
        this.wrongAnswerArray.push(this.state.wrongAnswer2);
        this.wrongAnswerArray.push(this.state.wrongAnswer3);
        const question = {
            prompt: this.state.prompt,
            rightAnswer: this.state.rightAnswer,
            wrongAnswers: this.wrongAnswerArray,
            guess: this.state.guess
        };
        console.log(question);
        // axios.post("http://localhost:5000/questions/add", question)
        //     .then(function () {
        //         window.location.replace("http://localhost:3000/qeditor");
        //     });
    }

    render() {
        let queryString = window.location.search;
        let searchParams = new URLSearchParams(queryString);
        let scrapedTestID = searchParams.get("testID");
        this.setState({
            testID: scrapedTestID
        });
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
                        <label>Wrong Answer 1: </label>
                        <input type="text"
                            required
                            onChange={this.onSetWrongAnswer1}>
                        </input>
                    </div>
                    <div className="qEditorFormField">
                        <label>Wrong Answer 2: </label>
                        <input type="text"
                            required
                            onChange={this.onSetWrongAnswer2}>
                        </input>
                    </div>
                    <div className="qEditorFormField">
                        <label>Wrong Answer 3: </label>
                        <input type="text"
                            required
                            onChange={this.onSetWrongAnswer3}>
                        </input>
                    </div>
                    <div className="submitButton">
                        <input type="submit" value="Add Question" />
                    </div>
                </form>
            </div>
        )
    }
}