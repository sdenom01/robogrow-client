import React from "react";
import "./home.css";

export default class App extends React.Component {
    render() {
        return (
            <body>
            <div className="container">
                <div className="row align-items-center my-5">
                    <div className="col-lg-7 text-center">
                        <img className="img-fluid rounded mb-4 mb-lg-0" src="./robogrow_drop_shadow.png" alt=""
                             style={{width: "200px"}}/>
                    </div>
                    <div className="col-lg-5">
                        <h1 className="font-weight-light text-white">
                            robogrow
                        </h1>

                        <br/>

                        <p>
                            A completely open-source control and automation system for the at home grower.
                            <strong> Documentation and designs will ALWAYS be free to use and modify.</strong>
                            <br/>
                            <br/>
                            Check out more <a href="/log">About Us</a> or check out our <a href="/pricing">Pricing </a>
                             to buy pre-made boards!
                        </p>

                        <br/>

                        <a className="btn btn-primary" href="#">Let's build together!</a>
                    </div>
                </div>

                <div className="row pb-4">
                    <div className="col-md-4 mb-5">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">Data Over Time</h5>
                                <p className="card-text">Adjustable data log interval, collect data once a day, hour,
                                    minute, or even second! Utilizing multiple threads, your data can collected without
                                    interrupting important relay schedules.</p>
                            </div>
                            <div className="">
                                <a href="#" className="btn btn-primary btn-sm">More Info</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-5">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">Complex Relay Schedules</h5>
                                <p className="card-text">Create a custom relay schedule or import and adjust one of our
                                    premade configurations. Add conditional relay control for exhaust fans or watering
                                    systems, you can even control them manually in <strong>real time</strong>!</p>
                            </div>
                            <div className="">
                                <a href="#" className="btn btn-primary btn-sm">More Info</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-5">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">Complete Grow Timeline</h5>
                                <p className="card-text">Keep track of your entire grow in one place, any important
                                    events or notes you might want can be easily added to a timeline. Never forget when
                                    you last watered again!</p>
                            </div>
                            <div className="">
                                <a href="#" className="btn btn-primary btn-sm">More Info</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="features-icons bg-secondary text-center">
                <br/>
                <br/>
                <div className="col-6 m-auto">
                    <iframe width="640" height="360" src="https://www.youtube.com/embed/0BBd3KXg4dQ" frameborder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>
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

            <footer className="py-5 bg-dark">
                <div className="container">
                    <p className="m-0 text-center text-white">Copyright &copy; robogrow</p>
                </div>
            </footer>

            <script src="vendor/jquery/jquery.min.js"></script>
            <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

            </body>
        );
    }
}