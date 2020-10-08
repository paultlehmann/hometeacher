import React, { Component } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

export default class StDashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loadedTests: [],
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
            if (decodedToken.accountType == "teacher") {
                window.location.replace("/dashboard");
            }
            return (
                <div>
                    <h3>Take a test</h3>
                    <div>
                        <ul>
                            {this.state.loadedTests.map(function (test) {
                                if (test.student == decodedToken.id && test.isComplete == false) {
                                return (
                                    <li>
                                        <b>{test.name}</b> -- Type: {test.testType} -- Questions: {test.questionArray.length} -- ID: {test.internalID}<br />
                                        <a href={`/testtaker?testID=${test.internalID}`}>Take Test</a><br />
                                    </li>
                                )
                                }
                            }, this)}
                        </ul>
                    </div>
                    <br />
                    <hr />
                </div>
            );
        }

}