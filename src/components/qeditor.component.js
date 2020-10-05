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
        this.onSaveAndAddAnother = this.onSaveAndAddAnother.bind(this);
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

    onSaveAndAddAnother(e) {
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
        axios.put(`http://localhost:5000/tests/id/${this.state.testID}`, question)
        .then(window.location.reload());
    }

    onSaveAndFinish(e) {
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
        axios.put(`http://localhost:5000/tests/id/${this.state.testID}`, question)
        .then(window.location.replace("http://localhost:3000/dashboard"));
    }

    onCancel(e) {
        e.preventDefault();
        window.location.replace("http://localhost:3000/dashboard");
    }

    componentDidMount() {
        let queryString = window.location.search;
        let searchParams = new URLSearchParams(queryString);
        let scrapedTestID = searchParams.get("testID");
        this.setState({
            testID: scrapedTestID
        });
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
                    <button onClick={this.onSaveAndAddAnother.bind(this)}>Save and Add Another</button>
                    <button onClick={this.onSaveAndFinish.bind(this)}>Save and Finish</button>
                    <button onClick={this.onCancel.bind(this)}>Cancel</button>
                    </div>
                </form>
            </div>
        )
    }
}