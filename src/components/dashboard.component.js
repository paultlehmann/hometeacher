import React, { Component } from "react";
import axios from "axios";

export default class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loadedTests: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/tests/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        loadedTests: response.data
                    }, function() {
                        console.log("Loaded tests -" + this.state.loadedTests);
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            })
            
    }

    render() {
        console.log("Currently loaded tests:" + this.state.loadedTests);
        return (
            <div>
                <h3><a href="/testeditor">Create a new test</a></h3>
                <br />
                <hr />
                <h3>Edit or assign an existing test</h3>
                <div>
                <ul>
                    {this.state.loadedTests.map(function (test) {
                    return(
                    <li>
                        Name: {test.name}, Type: {test.testType}, ID: {test._id}
                    </li>
                    )})}
                </ul>
                </div>
                <br />
                <hr />
                <h3>Grade a submitted test</h3>
            </div>
        );
    }
}

