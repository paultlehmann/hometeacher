import React, { Component } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import "../styles.css";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: "",
            password: "",
            sadMessage: ""
        }
    }

    onChange(e) {
        this.setState(
            {
                [e.target.id]: e.target.value
            }
        );
    }

    onSubmit(e) {
        let that = this;
        e.preventDefault();
        const loginData = {
            username: this.state.username,
            password: this.state.password
        };

        console.log(loginData);

        axios.post("http://localhost:5000/users/login", loginData)
            .then(function (res) {
                const token = res.data.token;
                localStorage.setItem("jwtToken", token);
                setAuthToken(token);
                const decodedToken = jwt_decode(token);
                console.log("Current user: " + JSON.stringify(decodedToken));
                if (decodedToken.accountType == "student") {
                    window.location.replace("/stdashboard");
                } else {
                    window.location.replace("/dashboard");
                }
            })
            .catch(function (err) {
                that.setState({
                    sadMessage: "ERROR: Invalid username or password."
                })
            })
    }

    render() {
        return (
            <div className = "general-body">
                <h3>Login</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="registerFormField">
                        <label>Username: </label>
                        <input type="text"
                            required
                            value={this.state.username}
                            onChange={this.onChange}
                            id="username">
                        </input>
                    </div>
                    <div className="registerFormField">
                        <label>Password: </label>
                        <input type="password"
                            required
                            value={this.state.password}
                            onChange={this.onChange}
                            id="password"
                        />
                    </div>
                    <div className="submitButton">
                        <button type="submit">Log In</button>
                    </div>
                    <div className="sad-message">{this.state.sadMessage}</div>
                    <br />
                    <div>
                        <h2>No account? <a href="/register">Register one now!</a></h2>
                    </div>
                </form>
            </div>
        )
    }
}