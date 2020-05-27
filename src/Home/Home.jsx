import React from "react";
import "./home.css";

export default class App extends React.Component {
    render() {
        return (
            <div>
                <div className="col-sm-12" style={{paddingTop: "100px"}}>
                    <div className="row m-4">
                        <div className="col-sm-12">
                            <div className="card p-4">
                                <h4>Dashboard</h4>
                                <p>Some text..</p>
                            </div>
                        </div>
                    </div>

                    <div className="row m-4">
                        <div className="col-sm-3">
                            <div className="card p-4">
                                <h4>Users</h4>
                                <p>1 Million</p>
                            </div>
                        </div>

                        <div className="col-sm-3">
                            <div className="card p-4">
                                <h4>Pages</h4>
                                <p>100 Million</p>
                            </div>
                        </div>

                        <div className="col-sm-3">
                            <div className="card p-4">
                                <h4>Sessions</h4>
                                <p>10 Million</p>
                            </div>
                        </div>

                        <div className="col-sm-3">
                            <div className="card p-4">
                                <h4>Bounce</h4>
                                <p>30%</p>
                            </div>
                        </div>
                    </div>

                    <div className="row m-4">
                        <div className="col-sm-4">
                            <div className="card p-4">
                                <p>Text</p>
                                <p>Text</p>
                                <p>Text</p>
                            </div>
                        </div>

                        <div className="col-sm-4">
                            <div className="card p-4">
                                <p>Text</p>
                                <p>Text</p>
                                <p>Text</p>
                            </div>
                        </div>

                        <div className="col-sm-4">
                            <div className="card p-4">
                                <p>Text</p>
                                <p>Text</p>
                                <p>Text</p>
                            </div>
                        </div>
                    </div>

                    <div className="row m-4 m-2">
                        <div className="col-sm-8">
                            <div className="card p-4">
                                <p>Text</p>
                            </div>
                        </div>

                        <div className="col-sm-4">
                            <div className="card p-4">
                                <p>Text</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}