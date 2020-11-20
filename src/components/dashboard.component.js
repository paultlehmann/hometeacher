import React, { Component } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "../styles.css";

export default class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.gradeTest = this.gradeTest.bind(this);

        this.state = {
            loadedTests: [],
            loadedUsers: [],
            token: localStorage.getItem("jwtToken")
        };
    }

    componentDidMount() {
        axios.get("http://localhost:5000/tests/")
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        loadedTests: response.data
                    }, function () {
                        console.log("Loaded tests -" + this.state.loadedTests);
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });

        axios.get("http://localhost:5000/users/")
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        loadedUsers: response.data
                    }, function () {
                        console.log("Loaded users -" + this.state.loadedUsers);
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    oldGetUserByID(id) {
        if (this.loadedUsers.length > 0) {
            console.log(this.loadedUsers.find(this.loadedUsers._id == id));
            return this.loadedUsers.find(this.loadedUsers._id == id);
        } else {
            return "loading...";
        }
    }

    getUserByID(id) {
        let getURL = "http://localhost:5000/users/id/" + id;
        console.log(getURL);
        axios.get(getURL)
            .then(response => {
                console.log(response.data);
                if (response.data) {
                    this.setState({
                        currentTeacher: response.data.firstName + " " + response.data.lastName
                    }
                    )
                }
            })
    }

    gradeTest(test) {

        let rightAnswers = 0;
        let wrongAnswers = 0;
        for (let question of test.questionArray) {

            let prompt = question.prompt;
            if (question.rightAnswer == test.guesses[prompt]) {
                rightAnswers += 1;
            } else {
                wrongAnswers += 1;
            }
        }
        console.log(rightAnswers);
        console.log(wrongAnswers);
        let scoresObject = {
            rightAnswers: rightAnswers,
            wrongAnswers: wrongAnswers
        }
        console.log(scoresObject);
        test["scores"] = scoresObject;
        let test2 = test
        console.log(test2);
        axios.delete(`http://localhost:5000/tests/id/${test.internalID}`)
        .then(axios.post("http://localhost:5000/tests/add", test2))
        .then(window.location.replace("/dashboard"));
    }

    render() {
        console.log(this.state.token);
        let decodedToken = {
            id: 0,
            accountType: ""
        }
        if (this.state.token) {
            decodedToken = jwt_decode(this.state.token);
            console.log(decodedToken);
        }
        if (decodedToken.accountType == "student") {
            window.location.replace("/stdashboard");
        }
        return (
            <div className = "general-body">
                <h3><a href="/testeditor">Create a new test</a></h3>
                <hr />
                <br />
                <div>
                    <h3>Edit or assign an existing test</h3>
                    <hr />
                </div>
                <div>
                    <ul>
                        {this.state.loadedTests.map(function (test) {
                            if (test.student == "" && test.teacher == decodedToken.id) {
                                return (
                                    <li>
                                        <b>{test.name}</b> -- Type: {test.testType} -- Questions: {test.questionArray.length}<br />
                                        <a href={`/qeditor?testID=${test.internalID}`}>Add Questions</a><br />
                                        <a href={`/assigntest?testID=${test.internalID}`}>Assign to Students</a><br /><br />
                                    </li>
                                )
                            }
                        }, this)}
                    </ul>
                </div>
                <br />
                <div>
                    <h3>Grade a submitted test</h3>
                    <hr />
                </div>
                <div>
                    <ul>
                        {this.state.loadedTests.map(function (test) {
                            if (test.isComplete && test.teacher == decodedToken.id && test.guesses && !test.scores) {
                                return (
                                    <li>
                                        <b>{test.name}</b> -- Type: {test.testType} -- Questions: {test.questionArray.length}<br />
                                        <button onClick={() => this.gradeTest(test)} >Grade</button>
                                    </li>
                                )
                            }
                        }, this)}
                    </ul>
                </div>
                <br />
                <div>
                    <h3>Graded and returned tests</h3>
                    <hr />
                </div>
                <div>
                    <ul>
                        {this.state.loadedTests.map(function (test) {
                            if (test.isComplete && test.teacher == decodedToken.id && test.scores && test.scores != {}) {
                                let scoreDenominator = 0;
                                if (test.scores) {
                                    scoreDenominator = test.scores.rightAnswers + test.scores.wrongAnswers}
                                return (
                                    <li>
                                        <b>{test.name}</b> -- Type: {test.testType}<br />
                                            Grade: {test.scores.rightAnswers} / {scoreDenominator}<br />
                                    </li>
                                )
                            }
                        }, this)}
                    </ul>
                </div>
            </div>
        );
    }
}

