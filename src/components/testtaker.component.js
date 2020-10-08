import React, { Component } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

export default class TestTaker extends Component {

    constructor(props) {
        super(props);

        this.getTest = this.getTest.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmitTest = this.onSubmitTest.bind(this);
        // this.onSaveTestProgress = this.onSaveTestProgress.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.setState = this.setState.bind(this);

        this.state = {
            loadedTest: {
                questionArray: []
            },
            testID: 0,
            currentGuesses: [],
            token: localStorage.getItem("jwtToken"),
            student: ""
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

    onChange(e) {
        let guessArray = this.state.currentGuesses;
        let index;
        for (let guess of guessArray) {
            if (guess.prompt == e.target.name) {
                console.log(e.target.name);
                delete guess.prompt;
                delete guess.guess;

            }
        }
        guessArray.push({
            prompt: e.target.name,
            guess: e.target.value
        })
        this.state.currentGuesses = guessArray;
        console.log(this.state.currentGuesses);
    }

    onSubmitTest(e) {
        e.preventDefault();
        console.log(this.state.token);
        const submittedTest = {
            name: this.state.loadedTest.name,
            questionArray: this.state.loadedTest.questionArray,
            testType: this.state.loadedTest.testType,
            teacher: this.state.loadedTest.teacher,
            student: this.state.student,
            isComplete: true,
            grade: this.state.loadedTest.grade,
            internalID: this.state.loadedTest.internalID + 1,
            guesses: this.state.currentGuesses
        }
        console.log(submittedTest);
        axios.post("http://localhost:5000/tests/add", submittedTest);
        console.log(`You submitted test #${this.state.loadedTest.internalID}`);
        window.location.replace("/stdashboard");
    }

    // onSaveTestProgress(e) {
    //     e.preventDefault();
    //     console.log(e.target);
    //     console.log(`You saved test #${this.state.loadedTest.internalID}`);
    // }

    onCancel(e) {
        e.preventDefault();
        window.location.replace("/stdashboard");
    }

    render() {
        let decodedToken = jwt_decode(this.state.token);
        let id = decodedToken.id;
        this.state.student = id;
        return (
            <div>
                <h3>{this.state.loadedTest.name}</h3>
                <br />
                <div onChange = {this.onChange}>
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
                                            <input type="radio" name={question.prompt} value={question.wrongAnswers[0]} />
                                        B. {question.wrongAnswers[0]}<br />
                                        </label>
                                        <label>
                                            <input type="radio" name={question.prompt} value={question.wrongAnswers[1]} />
                                        C. {question.wrongAnswers[1]}<br />
                                        </label>
                                        <label>
                                            <input type="radio" name={question.prompt} value={question.wrongAnswers[2]} />
                                        D. {question.wrongAnswers[2]}<br />
                                        </label>
                                    </li>
                                )
                            }, this)}
                        </ol>
                        <button onClick={this.onSubmitTest.bind(this)}>Submit Test</button>
                        {/* <button onClick={this.onSaveTestProgress.bind(this)}>Save Progress</button> */}
                        <button onClick={this.onCancel.bind(this)}>Cancel</button>
                    </form>
                </div>
            </div>
        )
    }

}