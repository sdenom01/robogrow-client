import React from "react";
import "./home.css";

export default class App extends React.Component {
    render() {
        return (
            <body>
            <div className="container">
                <div className="row align-items-center my-5">
                    <div className="col-lg-4 col-sm-12 text-center">
                        <img className="img-fluid mb-4 mb-lg-0" src="./robogrow_4_gradient_new_shadow.png" alt=""
                             style={{width: "300px"}}/>
                    </div>
                    <div className="col-lg-7 col-sm-12">
                        <img className="img-fluid mb-4 mb-lg-0" src="./robogrow_font_2_aligned.png" alt=""
                             style={{width: "300px"}}/>

                        <br/>
                        <br/>

                        <p>
                            A completely open-source control and automation system for the at home grower.
                            <strong> Documentation and designs will ALWAYS be free to use and modify.</strong>
                            <br/>
                            <br/>
                            Check out more <a href="/log">about us</a>.
                        </p>

                        <br/>

                        <a className="btn btn-primary" href="/register">Let's build together!</a>
                    </div>
                </div>

                <div className="row pb-4">
                    <div className="col-sm-12 col-md-4 mb-5">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">Data Over Time</h5>
                                <p className="card-text">Adjustable data log interval, collect data once a day, hour,
                                    minute, or even second! Utilizing multiple threads, your data can collected without
                                    interrupting important relay schedules.</p>
                            </div>
                            <div className="">
                                <a href="#data" className="btn btn-primary btn-sm">More Info</a>
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
                                <a href="#schedule" className="btn btn-primary btn-sm">More Info</a>
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
                                <a href="#timeline" className="btn btn-primary btn-sm">More Info</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*<section className="features-icons bg-secondary text-center">*/}
            {/*<br/>*/}
            {/*<br/>*/}
            {/*<div className="col-6 m-auto">*/}
            {/*<iframe width="640" height="360" src="https://www.youtube.com/embed/0BBd3KXg4dQ" frameborder="0"*/}
            {/*allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"*/}
            {/*allowfullscreen></iframe>*/}
            {/*</div>*/}
            {/*</section>*/}

            <section className="showcase">
                <div className="container-fluid p-0">
                    <div className="row no-gutters">

                        <div id="data" className="col-lg-6 order-lg-2 text-white showcase-img"
                             style={{backgroundImage: "url('/data_over_time.png')", objectFit: "fill"}}></div>
                        <div className="col-lg-6 order-lg-1 my-auto showcase-text">
                            <h2>Data Over Time</h2>
                            <p className="lead mb-0">
                                Optimizing your environment is key to maximize yield and overall plant health. With
                                configurable intervals your data can be as granular as you need allowing you to make
                                educated decisions regarding nutrient levels, Photosynthetically Active Radiation (PAR),
                                and even fine tune your configurations to give you the absolute BEST results.
                            </p>
                        </div>
                    </div>
                    <div className="row no-gutters">
                        <div id="schedule" className="col-lg-6 text-white showcase-img"
                             style={{backgroundImage: "url('/bg-showcase-2.jpg')"}}>>
                        </div>
                        <div className="col-lg-6 my-auto showcase-text">
                            <h2>Complex Relay Schedules</h2>
                            <p className="lead mb-0">Whether it be conditional or scheduled, having full control over an
                                array of electrical relays is a MUST in high production gardening today. Using the
                                configuration editor, you're able to completely customize as many relays as your board
                                can handle. Update your hardware in REAL TIME!</p>
                        </div>
                    </div>
                    <div className="row no-gutters pb-4">
                        <div  id="timeline" className="col-lg-6 order-lg-2 text-white showcase-img"
                             style={{backgroundImage: "url('/timeline.png')"}}>>
                        </div>
                        <div className="col-lg-6 order-lg-1 my-auto showcase-text">
                            <h2>Full Grow Timeline</h2>
                            <p className="lead mb-0">Keeping track of notes can be hard. Associate timeline events that
                                stay tied to your individual grow. Reviewing what works and what fails has never been
                                easier! Monitor things like pH, EC, and nutrient schedules, all with a fully functional
                                WYSIWYG editor!</p>
                        </div>
                    </div>
                </div>
            </section>
            </body>
        );
    }
}