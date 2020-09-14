import React, { Component } from "react";

export default class Dashboard extends Component {
    render() {
        return(
            <div>
            <h3><a href="/testeditor">Create a new test</a></h3>
            <br />
            <hr />
            <h3>Edit or assign an existing test</h3>
            <table>
                <tr>
                    <td><b>Name</b></td>
                    <td><b>Date created</b></td>
                    <td><b>Last modified</b></td>
                </tr>
                <tr>
                    <td><a href="">Example test 1</a></td>
                    <td>[Date/Time]</td>
                    <td>[Date/Time]</td>
                </tr>
                <tr>
                    <td><a href="">Example test 2</a></td>
                    <td>[Date/Time]</td>
                    <td>[Date/Time]</td>
                </tr>
            </table>
            <br />
            <hr />
            <h3>Grade a submitted test</h3>
            <table>
                <tr>
                    <td><b>Name</b></td>
                    <td><b>Submitter</b></td>
                    <td><b>Submission date</b></td>
                    <td><b>Grade</b></td>

                </tr>
                <tr>
                    <td><a href="">Example test 1</a></td>
                    <td>[Name]</td>
                    <td>[Date/Time]</td>
                    <td><a href="">Grade</a></td>
                </tr>
                <tr>
                <td><a href="">Example test 2</a></td>
                    <td>[Name]</td>
                    <td>[Date/Time]</td>
                    <td><a href="">Grade</a></td>
                </tr>
            </table>
            </div>
        );
    }
}

