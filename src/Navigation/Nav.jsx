import React from "react";
import "./nav.css"
import {authenticationService} from "../_services/authentication.service";
import {history} from "../_helpers/history";

export default class MyForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogOut = this.handleLogOut.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogOut() {
        authenticationService.logout();
        history.push('/login');
        window.location = "/login";
    }

    handleLogin() {
        history.push('/login');
        window.location = "/login";
    }

    render() {
        if (window.localStorage.currentUser) {
            let user = JSON.parse(window.localStorage.currentUser).user;

            return (
                <nav className="navbar bg-dark fixed-top" role="navigation">
                    <div className="container-fluid">
                        <ul className="nav navbar-nav navbar-expand">
                            <li className="nav-item">
                                <a href="/grows" className="nav-link border-0 text">Grows</a>
                            </li>
                            <li className="nav-item">
                                <a href="/configs" className="nav-link border-0">Configurations</a>
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
                </nav>
            )
                ;
        } else {
            return (
                <nav className="navbar bg-dark fixed-top" role="navigation">
                    <div className="container-fluid">
                        <ul className="nav navbar-nav navbar-expand">
                            <li className="nav-item">
                                <a href="/log" className="nav-link border-0 text">About</a>
                            </li>
                            <li className="nav-item">
                                <a href="/pricing" className="nav-link border-0">Pricing</a>
                            </li>
                        </ul>

                        <div className="nav navbar-nav flex-row justify-content-between ml-auto">
                            <button className="btn-primary m-2" onClick={this.handleLogin}>
                                Login
                            </button>
                        </div>
                    </div>
                </nav>
            );
        }
    }
}