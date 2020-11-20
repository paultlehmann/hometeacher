import React, { Component } from "react";
import axios from "axios";
import "../styles.css";

export default class AssignTest extends Component {

    constructor(props) {
        super(props);

        this.onSubmitCheckboxes = this.onSubmitCheckboxes.bind(this);
        this.onToggleCheckbox = this.onToggleCheckbox.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.happyMessageCheck = this.happyMessageCheck.bind(this);
        this.happyMessageCheck2 = this.happyMessageCheck2.bind(this);

        this.state = {
            testID: 0,
            loadedUsers: [],
            assignees: [],
            happyMessage: false,
            studentsAssignedTo: 0
        }
    }

    onToggleCheckbox(e) {
        let assigneesArray = this.state.assignees;
        let index;

        if (e.target.checked) {
            assigneesArray.push(e.target.name)
        } else {
            index = assigneesArray.indexOf(e.target.name);
            assigneesArray.splice(index, 1)
        }

        this.setState(
            {
                assignees: assigneesArray
            }
        )
    }

    onSubmitCheckboxes(e) {
        e.preventDefault();
        let assigneeArray = this.state.assignees;
        console.log(assigneeArray);
        for (const assignee of assigneeArray) {
            axios.get(`http://localhost:5000/tests/id/${this.state.testID}`)
                .then(response => {
                    console.log(assignee);
                    let importedTest = response.data;
                    importedTest.student = assignee;
                    importedTest.internalID = Math.floor(Math.random() * 1000000000);
                    axios.post("http://localhost:5000/tests/add", importedTest)
                }, function () {
                    console.log("Added test.")
                });
        }
        this.setState({
            happyMessage: true,
            studentsAssignedTo: assigneeArray.length
        })
    }

    onCancel(e) {
        e.preventDefault();
        window.location.replace("/dashboard");
    }

    happyMessageCheck() {
        if (this.state.happyMessage) {
            return `Test successfully assigned to ${this.state.studentsAssignedTo} student(s).`
        }
    }

    happyMessageCheck2() {
        if (this.state.happyMessage) {
            return "Click here to return to your dashboard."
        }
    }

    componentDidMount() {
        let queryString = window.location.search;
        let searchParams = new URLSearchParams(queryString);
        let scrapedTestID = searchParams.get("testID");
        this.setState({
            testID: scrapedTestID,
            assignedTestInternalID: scrapedTestID
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
    }

    render() {
        return (
            <div>
                <h3>Assign test to students</h3>
                <div>
                    <form>
                        <p>Check the students you wish to assign the test to:</p>
                        <ul>



                            {this.state.loadedUsers.map(function (user) {
                                if (user.accountType == "student") {
                                return (
                                    <li>
                                        <label>
                                            <input name={user._id}
                                                type="checkbox"
                                                onChange={this.onToggleCheckbox}
                                            />
                                        </label>
                                        {user.firstName} {user.lastName} (ID: {user._id})
                                    </li>
                                )}
                            }, this)}
                        </ul>
                        <button onClick = {this.onSubmitCheckboxes.bind(this)}>Assign</button>
                        <button onClick = {this.onCancel.bind(this)}>Cancel</button>
                    </form>
                </div>
                <br />
                <div class = "happy-message">
                {this.happyMessageCheck()}<br />
                </div>
                <div class = "click-to-return">
                <a href = "/dashboard">{this.happyMessageCheck2()}</a>
                </div>
            </div>
        )
    }
}