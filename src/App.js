import React from "react";
import {
    BrowserRouter as Router,
    withRouter,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import "bootswatch/dist/slate/bootstrap.min.css";

import {history} from './_helpers/history';
import {authenticationService} from './_services/authentication.service';

import Nav from "./Navigation/Nav";

import {PrivateRoute} from './_components/PrivateRoute';

import HomePage from './Home/Home';
import DevLog from './DevLog/DevLog';
import RegisterPage from './Register/Register';
import LoginPage from './Login/Login';
import GrowList from "./GrowList/GrowList";
import GrowDetails from "./GrowDetails/GrowDetails";
import GrowTimeline from "./GrowTimeline/GrowTimeline";
import GrowEdit from "./GrowEdit/GrowEdit";
import GrowConfigs from "./GrowConfigs/GrowConfigList";
import GrowConfigEdit from "./GrowConfigs/GrowConfigEdit/GrowConfigEdit";

import NotFoundPage from './NotFound/NotFound';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        // global.apiUrl = `http://localhost:3000`;
        global.apiUrl = `https://api.robogrow.io`;

        this.state = {
            currentUser: null
        };
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({currentUser: x}));
    }

    render() {
        let user = (window.localStorage.currentUser) ? JSON.parse(window.localStorage.currentUser).user : null;

        return (
            <div>
                <Nav/>

                <div style={{marginTop: "85px"}}>
                    <Router>
                        <Switch>
                            <Route path="/register">
                                <RegisterPage/>
                            </Route>

                            <Route path="/login">
                                <LoginPage/>
                            </Route>

                            <PrivateRoute path="/grows/new" component={GrowEdit}/>
                            <PrivateRoute path="/grows/:growId/edit" component={GrowEdit}/>
                            <PrivateRoute path="/grows/:growId/timeline" component={GrowTimeline}/>
                            <PrivateRoute path="/grows/:growId" component={GrowDetails}/>
                            <PrivateRoute path="/grows" component={GrowList}/>

                            <PrivateRoute path="/configs/new" component={GrowConfigEdit}/>
                            <PrivateRoute path="/configs/:configId" component={GrowConfigEdit}/>
                            <PrivateRoute path="/configs" component={GrowConfigs}/>

                            <Route path="/log">
                                <DevLog/>
                            </Route>

                            <Route path="/not-found" component={NotFoundPage} />

                            <Route exact path="/">
                                <HomePage/>
                            </Route>

                            <Redirect to="/not-found" />

                            {/* Removed for MVP */}
                            {/*<PrivateRoute path="/" component={Home}/>*/}
                        </Switch>
                    </Router>
                </div>
            </div>
        );
    }
}