import React, { Component } from "react";
import axios from "axios";
import { getByTestId } from "@testing-library/react";

export default class TestTaker extends Component {

    constructor(props) {
        super(props);

        this.getTest = this.getTest.bind(this);

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
        }, function() {
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

    render() {
        return (
            <div>
                <h3>{this.state.loadedTest.name}</h3>
                <br />
                <div>
                    <ul>
                        {this.state.loadedTest.questionArray.map(function (question) {
                            return (
                                <li>
                                    {question.prompt}<br />
                                    A. {question.rightAnswer}<br />
                                    B. {question.wrongAnswers[0]}<br />
                                    C. {question.wrongAnswers[1]}<br />
                                    D. {question.wrongAnswers[2]}<br />
                                </li>
                            )
                        }, this)}
                    </ul>
                </div>
            </div>
        )
    }

}