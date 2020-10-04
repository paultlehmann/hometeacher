import React, { Component } from "react";
import axios from "axios";

export default class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loadedTests: [],
            loadedUsers: [],
            currentTeacher: ""
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/tests/')
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

        axios.get('http://localhost:5000/users/')
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

            this.getUserByID("5f4432a01b2c1d34343fe790");

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
                )}
    })}

    render() {
        console.log("Currently loaded tests: " + this.state.loadedTests);
        console.log("Currently loaded users: " + this.state.loadedUsers);
        console.log("Current teacher: " + this.state.currentTeacher);
        return (
            <div>
                <h3><a href="/testeditor">Create a new test</a></h3>
                <br />
                <hr />
                <h3>Edit or assign an existing test</h3>
                <div>
                    <ul>
                        {this.state.loadedTests.map(function (test) {
                            return (
                                <li>
                                    Name: {test.name}, Type: {test.testType}, ID: {test._id}, Teacher: {this.state.currentTeacher}
                                </li>
                            )
                        }, this)}
                    </ul>
                </div>
                <br />
                <hr />
                <h3>Grade a submitted test</h3>
            </div>
        );
    }
}

