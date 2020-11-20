import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import "../styles.css";


export default class Navbar extends Component {

    constructor(props) {
        super(props);

        this.onLogout = this.onLogout.bind(this);

        this.state = {}
    }

    onLogout() {
        localStorage.removeItem("jwtToken");
        window.location.replace("/login");
    }

    render() {
        let decodedToken = {
            firstName: "Not logged in!"
        }
        const token = localStorage.getItem("jwtToken");
        if (token != null) {
        decodedToken = jwt_decode(token);
        }
        return (
            <nav className="header">
                <table>
                    <tr>
                        <td><font size="22">HomeTeacher</font></td>
                        <td>Currently logged in as:<br />
                            {decodedToken.firstName} {decodedToken.lastName}<br />
                            ({decodedToken.accountType})<br />
                            <button onClick = {this.onLogout}>Log Out</button>
                        </td>
                    </tr>
                </table>
            </nav >
        );
    }
}