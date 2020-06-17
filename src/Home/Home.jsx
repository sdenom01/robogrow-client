import React from "react";
import "./home.css";

export default class App extends React.Component {
    render() {
        return (
            <div>
                <header className="masthead text-white text-center">
                    <div className="row">
                        <img src="/robogrow_drop_shadow.png" className="m-auto"
                             style={{width: "300px", height: "300px"}}/>
                    </div>
                </header>

                <section className="features-icons bg-light text-center">
                    <div className="col-xl-4  col-lg-6 mx-auto mt-3 mb-3 p-3 text-dark">
                        <h1 className="mb-5">Open-source control and automation system for the at home
                            grower.</h1>
                    </div>
                    <div className="col-md-10 col-lg-8 col-xl-7 mx-auto">
                        <form>
                            <div className="form-row">
                                <div className="col-12">
                                    <a href="/register" className="btn btn-primary">
                                        Click here to sign up!
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
                <section className="showcase">
                    <div className="container-fluid p-0">
                        <div className="row no-gutters">

                            <div className="col-lg-6 order-lg-2 text-white showcase-img"
                                 style={{backgroundImage: "url('/data_over_time.png')", objectFit: "fill"}}></div>
                            <div className="col-lg-6 order-lg-1 my-auto showcase-text">
                                <h2>Data Over Time</h2>
                                <p className="lead mb-0">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lobortis sem nisi, at
                                    molestie sem varius ut. Integer placerat sapien vel nibh auctor, eget ullamcorper
                                    tellus viverra. Suspendisse potenti. Cras ac neque justo. Integer tempus, urna sit
                                    amet facilisis consectetur, ligula risus laoreet nisi, vitae maximus nisi eros id
                                    ante. Vestibulum at felis lorem. Quisque feugiat vestibulum sem quis faucibus.
                                    Pellentesque a molestie est, et tempus augue. Aenean vitae sapien iaculis, malesuada
                                    mauris in, gravida nulla. Nunc mollis mauris diam, sagittis semper metus congue non.
                                    Nam consectetur sollicitudin dolor, non volutpat justo. Maecenas convallis, tortor
                                    id elementum ultricies, mauris lectus facilisis magna, vel pulvinar arcu lorem ut
                                    mi.
                                </p>
                            </div>
                        </div>
                        <div className="row no-gutters">
                            <div className="col-lg-6 text-white showcase-img"
                                 style={{backgroundImage: "url('/bg-showcase-2.jpg')"}}>>
                            </div>
                            <div className="col-lg-6 my-auto showcase-text">
                                <h2>Complex Relay Schedules</h2>
                                <p className="lead mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                                    lobortis sem nisi, at molestie sem varius ut. Integer placerat sapien vel nibh
                                    auctor, eget ullamcorper tellus viverra. Suspendisse potenti. Cras ac neque justo.
                                    Integer tempus, urna sit amet facilisis consectetur, ligula risus laoreet nisi,
                                    vitae maximus nisi eros id ante. Vestibulum at felis lorem. Quisque feugiat
                                    vestibulum sem quis faucibus. Pellentesque a molestie est, et tempus augue. Aenean
                                    vitae sapien iaculis, malesuada mauris in, gravida nulla. Nunc mollis mauris diam,
                                    sagittis semper metus congue non. Nam consectetur sollicitudin dolor, non volutpat
                                    justo. Maecenas convallis, tortor id elementum ultricies, mauris lectus facilisis
                                    magna, vel pulvinar arcu lorem ut mi.</p>
                            </div>
                        </div>
                        <div className="row no-gutters">
                            <div className="col-lg-6 order-lg-2 text-white showcase-img"
                                 style={{backgroundImage: "url('/timeline.png')"}}>>
                            </div>
                            <div className="col-lg-6 order-lg-1 my-auto showcase-text">
                                <h2>Full Grow Timeline</h2>
                                <p className="lead mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                                    lobortis sem nisi, at molestie sem varius ut. Integer placerat sapien vel nibh
                                    auctor, eget ullamcorper tellus viverra. Suspendisse potenti. Cras ac neque justo.
                                    Integer tempus, urna sit amet facilisis consectetur, ligula risus laoreet nisi,
                                    vitae maximus nisi eros id ante. Vestibulum at felis lorem. Quisque feugiat
                                    vestibulum sem quis faucibus. Pellentesque a molestie est, et tempus augue. Aenean
                                    vitae sapien iaculis, malesuada mauris in, gravida nulla. Nunc mollis mauris diam,
                                    sagittis semper metus congue non. Nam consectetur sollicitudin dolor, non volutpat
                                    justo. Maecenas convallis, tortor id elementum ultricies, mauris lectus facilisis
                                    magna, vel pulvinar arcu lorem ut mi.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/*<section className="testimonials text-center bg-light">*/}
                {/*<div className="container">*/}
                {/*<h2 className="mb-5">What people are saying...</h2>*/}
                {/*<div className="row">*/}
                {/*<div className="col-lg-4">*/}
                {/*<div className="testimonial-item mx-auto mb-5 mb-lg-0">*/}
                {/*<img className="img-fluid rounded-circle mb-3" src="/testimonials-1.jpg" alt=""/>*/}
                {/*<h5>Margaret E.</h5>*/}
                {/*<p className="font-weight-light mb-0">"This is fantastic! Thanks so much guys!"</p>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*<div className="col-lg-4">*/}
                {/*<div className="testimonial-item mx-auto mb-5 mb-lg-0">*/}
                {/*<img className="img-fluid rounded-circle mb-3" src="/testimonials-2.jpg" alt=""/>*/}
                {/*<h5>Fred S.</h5>*/}
                {/*<p className="font-weight-light mb-0">"Bootstrap is amazing. I've been using it to*/}
                {/*create lots of super nice landing pages."</p>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*<div className="col-lg-4">*/}
                {/*<div className="testimonial-item mx-auto mb-5 mb-lg-0">*/}
                {/*<img className="img-fluid rounded-circle mb-3" src="/testimonials-3.jpg" alt=""/>*/}
                {/*<h5>Sarah W.</h5>*/}
                {/*<p className="font-weight-light mb-0">"Thanks so much for making these free*/}
                {/*resources available to us!"</p>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*</section>*/}

                <section className="call-to-action text-white text-center">
                    <div className="overlay"></div>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-9 mx-auto">
                                <h2 className="mb-4">Ready to get started? Sign up now!</h2>
                            </div>
                            <div className="col-md-10 col-lg-8 col-xl-7 mx-auto">
                                <form>
                                    <div className="form-row">
                                        <div className="col-12 col-md-9 mb-2 mb-md-0">
                                            <input type="email" className="form-control form-control-lg"
                                                   placeholder="Enter your email..."/>
                                        </div>
                                        <div className="col-12 col-md-3">
                                            <a href="/register" className="btn btn-info">
                                                Sign Up!
                                            </a>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}