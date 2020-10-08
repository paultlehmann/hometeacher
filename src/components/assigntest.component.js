import React, { Component } from "react";
import axios from "axios";

export default class AssignTest extends Component {

    constructor(props) {
        super(props);

        this.onSubmitCheckboxes = this.onSubmitCheckboxes.bind(this);
        this.onToggleCheckbox = this.onToggleCheckbox.bind(this);
        this.onCancel = this.onCancel.bind(this);

        this.state = {
            testID: 0,
            loadedUsers: [],
            assignees: []
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
                    let importedTest = response.data;
                    importedTest.student = assignee;
                    importedTest.internalID += 1;
                    axios.post("http://localhost:5000/tests/add", importedTest)
                }, function () {
                    console.log("Loaded tests -" + this.state.loadedTests);
                });
        }
    }

    onCancel(e) {
        e.preventDefault();
        window.location.replace("/dashboard");
    }

    componentDidMount() {
        let queryString = window.location.search;
        let searchParams = new URLSearchParams(queryString);
        let scrapedTestID = searchParams.get("testID");
        this.setState({
            testID: scrapedTestID
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
                                )
                            }, this)}
                        </ul>
                        <button onClick = {this.onSubmitCheckboxes.bind(this)}>Assign</button>
                        <button onClick = {this.onCancel.bind(this)}>Cancel</button>
                    </form>
                </div>
            </div>
        )
    }
}