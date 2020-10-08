import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: "",
            password: ""
        }
    }

    onChange(e) {
        this.setState (
            {
                [e.target.id]: e.target.value
            }
        );
    }

    onSubmit(e) {
        e.preventDefault();
        const loginData = {
            username: this.state.username,
            password: this.state.password
        };

        console.log(loginData);
    }

    render() {
        return (
            <div>
                <h3>Login</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="registerFormField">
                        <label>Username: </label>
                        <input type="text"
                            required
                            value={this.state.username}
                            onChange={this.onChange}
                            id = "username">
                        </input>
                    </div>
                    <div className="registerFormField">
                        <label>Password: </label>
                        <input type="password"
                            required
                            value={this.state.password}
                            onChange={this.onChange}
                            id = "password"
                        />
                    </div>
                    <div className="submitButton">
                        <button type="submit">Log In</button>
                    </div>
                </form>
            </div>
        )
    }
}