import React from "react";
import "./nav.css"
import {authenticationService} from "../_services/authentication.service";
import {history} from "../_helpers/history";

export default class MyForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogOut = this.handleLogOut.bind(this);
    }

    handleLogOut() {
        authenticationService.logout();
        history.push('/login');
    }

    render() {
        let user = JSON.parse(window.localStorage.currentUser).user;

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" role="navigation">
                <div className="container">
                    <a className="navbar-brand" href="/">Brand</a>
                    <button className="navbar-toggler border-0" type="button" data-toggle="collapse"
                            data-target="#exCollapsingNavbar">
                        &#9776;
                    </button>

                    <div className="collapse navbar-collapse" id="exCollapsingNavbar">
                        <ul className="nav navbar-nav">
                            <li className="nav-item">
                                <a href="/grows" className="nav-link">Grows</a>
                            </li>
                            <li className="nav-item">
                                <a href="/configs" className="nav-link">Configurations</a>
                            </li>
                        </ul>
                        <div className="nav navbar-nav flex-row justify-content-between ml-auto">
                            <div className="login-container mr-2 mt-auto mb-auto">
                                Hello {user.username}!
                            </div>
                            <button className="btn-primary" onClick={this.handleLogOut}>
                                Log out?
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}