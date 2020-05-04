import React from "react";
import {
    BrowserRouter as Router,
    withRouter,
    Switch,
    Route
} from "react-router-dom";

import "bootswatch/dist/slate/bootstrap.min.css";

import {history} from './_helpers/history';
import {authenticationService} from './_services/authentication.service';

import {PrivateRoute} from './_components/PrivateRoute';
import RegisterPage from './Register/Register';
import LoginPage from './Login/Login';
import Home from "./Home/Home";
import GrowList from "./GrowList/GrowList";
import GrowDetails from "./GrowDetails/GrowDetails";
import GrowEdit from "./GrowEdit/GrowEdit";
import GrowConfigs from "./GrowConfigs/GrowConfigs";
import GrowConfigDetails from "./GrowConfigDetails/GrowConfigDetails";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        };
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({currentUser: x}));
    }

    render() {
        return (
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
                    <PrivateRoute path="/grows/:growId" component={GrowDetails}/>
                    <PrivateRoute path="/grows" component={GrowList}/>


                    {/*<PrivateRoute path="/configs/:configId/edit" component={GrowConfigEdit}/>*/}
                    <PrivateRoute path="/configs/:configId" component={GrowConfigDetails}/>
                    <PrivateRoute path="/configs" component={GrowConfigs}/>

                    <PrivateRoute path="/" component={Home}/>
                </Switch>
            </Router>
        );
    }
}