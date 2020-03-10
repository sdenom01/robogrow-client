import React from "react";
import Carousel from "react-bootstrap/Carousel";
import {authenticationService} from '../_services/authentication.service';
import Nav from '../Navigation/Nav';
import "./home.css";

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Nav/>

                <div className="container" style={{paddingTop: "100px"}}>
                    <div className="row">
                        <div className="col-sm-8">
                            <Carousel>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="http://getwallpapers.com/wallpaper/full/5/7/5/170960.jpg"
                                        alt="First slide"
                                    />
                                    <Carousel.Caption>
                                        <h3>First slide label</h3>
                                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="http://getwallpapers.com/wallpaper/full/7/8/1/170998.jpg"
                                        alt="Third slide"
                                    />

                                    <Carousel.Caption>
                                        <h3>Second slide label</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="http://getwallpapers.com/wallpaper/full/4/8/1/170950.jpg"
                                        alt="Third slide"
                                    />

                                    <Carousel.Caption>
                                        <h3>Third slide label</h3>
                                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            </Carousel>
                        </div>
                        <div className="col-sm-4">
                            <div className="well">
                                <p>Strip steak boudin meatball.</p>
                            </div>

                            <div className="well">
                                <p>Bacon ipsum dolor amet kevin prosciutto sausage ribeye, venison turkey burgdoggen
                                    fatback
                                    cow kielbasa beef. Chislic capicola shankle sausage salami andouille, pork chop
                                    turducken ribeye strip steak prosciutto ground round.</p>
                            </div>
                            <div className="well">
                                <p>Salami sausage turkey kielbasa chuck pig. Cow tenderloin leberkas kielbasa pig kevin.
                                    Boudin strip steak ribeye ham short ribs. Burgdoggen shoulder boudin fatback.
                                    Turducken
                                    sirloin brisket, t-bone pork venison sausage tenderloin. </p>
                            </div>
                            <div className="well">
                                <p>Kielbasa short ribs ball tip, cupim jerky turducken cow fatback. Tri-tip flank
                                    alcatra
                                    pork loin, venison t-bone cow ham hock. Sausage chuck meatball frankfurter, meatloaf
                                    fatback ball tip capicola andouille boudin turkey. Spare ribs ball tip picanha
                                    drumstick
                                    flank. Pork spare ribs landjaeger t-bone ham hock cow sirloin, tenderloin flank
                                    tri-tip.</p>
                            </div>
                        </div>
                    </div>
                    <hr/>
                </div>

                <div className="container text-center">
                    <h3>What We Do</h3>
                    <br/>
                    <div className="row">
                        <div className="col-sm-3">
                            <img src="https://placehold.it/150x80?text=IMAGE" className="img-responsive"
                                 style={{width: "100%"}} alt="Image"/>
                            <p>Current Project</p>
                        </div>
                        <div className="col-sm-3">
                            <img src="https://placehold.it/150x80?text=IMAGE" className="img-responsive"
                                 style={{width: "100%"}} alt="Image"/>
                            <p>Project 2</p>
                        </div>
                        <div className="col-sm-3">
                            <div className="well">
                                <p>Some text..</p>
                            </div>
                            <div className="well">
                                <p>Some text..</p>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="well">
                                <p>Some text..</p>
                            </div>
                            <div className="well">
                                <p>Some text..</p>
                            </div>
                        </div>
                    </div>
                    <hr/>
                </div>

                <div className="container text-center">
                    <h3>Our Partners</h3>
                    <br/>
                    <div className="row">
                        <div className="col-sm-2">
                            <img src="https://placehold.it/150x80?text=IMAGE" className="img-responsive"
                                 style={{width: "100%"}} alt="Image"/>
                            <p>Partner 1</p>
                        </div>
                        <div className="col-sm-2">
                            <img src="https://placehold.it/150x80?text=IMAGE" className="img-responsive"
                                 style={{width: "100%"}} alt="Image"/>
                            <p>Partner 2</p>
                        </div>
                        <div className="col-sm-2">
                            <img src="https://placehold.it/150x80?text=IMAGE" className="img-responsive"
                                 style={{width: "100%"}} alt="Image"/>
                            <p>Partner 3</p>
                        </div>
                        <div className="col-sm-2">
                            <img src="https://placehold.it/150x80?text=IMAGE" className="img-responsive"
                                 style={{width: "100%"}} alt="Image"/>
                            <p>Partner 4</p>
                        </div>
                        <div className="col-sm-2">
                            <img src="https://placehold.it/150x80?text=IMAGE" className="img-responsive"
                                 style={{width: "100%"}} alt="Image"/>
                            <p>Partner 5</p>
                        </div>
                        <div className="col-sm-2">
                            <img src="https://placehold.it/150x80?text=IMAGE" className="img-responsive"
                                 style={{width: "100%"}} alt="Image"/>
                            <p>Partner 6</p>
                        </div>
                    </div>
                </div>
                <br/>

                <footer className="container-fluid text-center bg-dark">
                    <p>Footer Text</p>
                </footer>
            </div>
        );
    }
}