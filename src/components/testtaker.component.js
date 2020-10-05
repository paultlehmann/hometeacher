import React, { Component } from "react";
import axios from "axios";

export default class TestTaker extends Component {

    constructor(props) {
        super(props);

        this.getTest = this.getTest.bind(this);
        this.onSubmitTest = this.onSubmitTest.bind(this);
        this.onSaveTestProgress = this.onSaveTestProgress.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.setState = this.setState.bind(this);

        this.state = {
            loadedTest: {
                questionArray: []
            },
            testID: 0
        };
    }

    componentDidMount() {
        let queryString = window.location.search;
        let searchParams = new URLSearchParams(queryString);
        let scrapedTestID = searchParams.get("testID");
        this.setState({
            testID: scrapedTestID
        }, function () {
            this.getTest();
        })
    }

    getTest() {
        axios.get(`http://localhost:5000/tests/id/${this.state.testID}`)
            .then(response => {
                if (response.data) {
                    this.setState({
                        loadedTest: response.data
                    }, function () {
                        console.log("Loaded test - " + this.state.loadedTest.name);
                    });
                }
            })

        console.log(this.state.loadedTest);
    }

    onSubmitTest(e) {
        e.preventDefault();
        console.log(`You submitted test #${this.state.loadedTest.internalID}`);
    }

    onSaveTestProgress(e) {
        e.preventDefault();
        console.log(`You saved test #${this.state.loadedTest.internalID}`);
    }

    onCancel(e) {
        e.preventDefault();
        window.location.replace("/stdashboard");
    }

    render() {
        return (
            <div>
                <h3>{this.state.loadedTest.name}</h3>
                <br />
                <div>
                    <form>
                        <ol>
                            {this.state.loadedTest.questionArray.map(function (question) {
                                return (
                                    <li className="test-taker-question">
                                        {question.prompt}<br />
                                        <label>
                                            <input type="radio" name={question.prompt} value={question.rightAnswer} />
                                        A. {question.rightAnswer}<br />
                                        </label>
                                        <label>
                                            <input type="radio" name={question.prompt} value={question.rightAnswer} />
                                        B. {question.wrongAnswers[0]}<br />
                                        </label>
                                        <label>
                                            <input type="radio" name={question.prompt} value={question.rightAnswer} />
                                        C. {question.wrongAnswers[1]}<br />
                                        </label>
                                        <label>
                                            <input type="radio" name={question.prompt} value={question.rightAnswer} />
                                        D. {question.wrongAnswers[2]}<br />
                                        </label>
                                    </li>
                                )
                            }, this)}
                        </ol>
                        <button onClick={this.onSubmitTest.bind(this)}>Submit Test</button>
                        <button onClick={this.onSaveTestProgress.bind(this)}>Save Progress</button>
                        <button onClick={this.onCancel.bind(this)}>Cancel</button>
                    </form>
                </div>
            </div>
        )
    }

}