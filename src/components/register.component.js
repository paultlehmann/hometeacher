import React, { Component } from "react";
import axios from "axios";

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.onSetUsername = this.onSetUsername.bind(this);
        this.onSetPassword = this.onSetPassword.bind(this);
        this.onSetFirstName = this.onSetFirstName.bind(this);
        this.onSetLastName = this.onSetLastName.bind(this);
        this.onSetAccountType = this.onSetAccountType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            accountType: "teacher"
        }
    }

    onSetUsername(e) {
        this.setState({
            username: e.target.value
        });
    }
    onSetPassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    onSetFirstName(e) {
        this.setState({
            firstName: e.target.value
        });
    }
    onSetLastName(e) {
        this.setState({
            lastName: e.target.value
        });
    }
    onSetAccountType(e) {
        this.setState({
            accountType: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            accountType: this.state.accountType
        };
        console.log(user);
        axios.post("http://localhost:5000/users/add", user)
            .then(function () {
                window.location.replace("http://localhost:3000/dashboard");
            });
    }

    render() {
        return (
            <div>
                <h3>Register Account</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="registerFormField">
                        <label>Username: </label>
                        <input type="text"
                            required
                            value={this.state.username}
                            onChange={this.onSetUsername}>
                        </input>
                    </div>
                    <div className="registerFormField">
                        <label>Password: </label>
                        <input type="password"
                            required
                            value={this.state.password}
                            onChange={this.onSetPassword}
                        />
                    </div>
                    <div className="registerFormField">
                        <label>First Name: </label>
                        <input
                            type="text"
                            required
                            value={this.state.firstName}
                            onChange={this.onSetFirstName}
                        />
                    </div>
                    <div className="registerFormField">
                        <label>Last Name: </label>
                        <input
                            type="text"
                            required
                            value={this.state.lastName}
                            onChange={this.onSetLastName}
                        />
                    </div>
                    <div className="registerFormField">
                        <label>Account Type: </label>
                        <select
                            type="text"
                            value={this.state.accountType}
                            onChange={this.onSetAccountType}>
                            <option value="teacher">Teacher</option>
                            <option value="student">Student</option>
                        </select>
                    </div>

                    <div className="submitButton">
                        <input type="submit" value="Register" />
                    </div>
                </form>
            </div>
        )
    }
}