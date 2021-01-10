import React from "react";
import "./devlog.css";

export default class App extends React.Component {
    render() {
        return (
            <body>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>The story so far...</h1>

                        <p className="ml-2 mb-4">Last updated on July 14, 2020</p>

                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12 mb-5">
                                <img style={{width: "500px"}}
                                     className="img-fluid rounded shadow"
                                     src="https://cdn.discordapp.com/attachments/415233696019382291/717782181220450334/unknown.png"
                                     alt=""/>
                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-12 mb-5">
                                <p className="p-4">
                                    <strong>It lives!</strong>
                                    <br/>
                                    This is the humble beginnings of my system. After many hours and rebuilds, I was
                                    finally able to reach this point, a working prototype!
                                    <br/>
                                    <br/>
                                    I've gone with a full NodeJS stack, with a NoSQL database.

                                    <br/>

                                    You can find the code for the individual projects here:

                                    <br/>
                                    <br/>

                                    <ul>
                                        <li>
                                            <a href="https://github.com/sdenom01/robogrow_script_final">Raspberry Pi
                                                Script</a>
                                        </li>
                                        <li>
                                            <a href="https://github.com/sdenom01/robogrow-api">Rest API</a>
                                        </li>
                                        <li className="mt-0">
                                            <a href="https://github.com/sdenom01/robogrow-client">React Web App</a>
                                        </li>
                                    </ul>

                                    After I debug this for a bit longer, the next steps will be to create a prototype
                                    board that will condense and secure everything. I should also look into adding LEDs
                                    to serve as indicators, would help a lot with debugging without having to connect
                                    directly to the Raspberry Pi.
                                </p>
                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-12 mb-5">
                                <img style={{width: "500px"}} className="img-fluid rounded shadow"
                                     src="https://cdn.discordapp.com/attachments/415233696019382291/717782075003895888/2020-05-30.png"
                                     alt=""/>
                            </div>


                            <div className="col-lg-6 col-md-6 col-sm-12 mb-5">
                                <div className="p-4">
                                    <strong>First Protoboard!</strong>

                                    <p>This thing is still pretty ugly, but it's a massive step up from the previous
                                        design. It's
                                        not that easy to see, but I added 4 indicator lights for 'at a glance'
                                        debugging.
                                        <br/>
                                        <br/>

                                        <div className="card text-left w-75 m-auto">
                                            <ul className="mb-1">
                                                <li className="text-success">
                                                    Connection to server
                                                </li>
                                                <li className="text-success">
                                                    Temp / Humidity Sensor is OK
                                                </li>
                                                <li className="mt-0 text-success">
                                                    Lux / Infrared Sensor is OK
                                                </li>
                                                <li className="mt-0 text-info">
                                                    Data successfully POSTed to server
                                                </li>
                                            </ul>
                                        </div>

                                        <br/>

                                        A professionally etched PCB would improve the overall aesthetics and efficiency
                                        greatly. I've failed <strong>many</strong> times with DIY options...
                                    </p>
                                </div>
                            </div>


                            <div className="col-lg-6 col-md-6 col-sm-12 mb-5">
                                <img style={{width: "500px"}} className="img-fluid rounded shadow"
                                     src="https://cdn.discordapp.com/attachments/415233696019382291/717781913498288288/2020-06-02.png"
                                     alt=""/>
                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-12 mb-5">
                                <div className="p-4">
                                    <strong>Complex Relay Schedules</strong>

                                    <p>
                                        I was able to utilize a third-party library to schedule generic relay events.
                                        This allowed me to faithfully unplug my existing light controller and for the
                                        first time robogrow is <strong>IN CONTROL!</strong>
                                    </p>

                                    <br/>

                                    <p>
                                        After all the frustrating work, seeing my creation in action and viewing the
                                        data coming in real-time,
                                        is invigorating, I can't wait to work on this more!

                                        <br/>
                                        <br/>

                                        I need to add the ability for conditional relay control in the near future.
                                    </p>

                                    <br/>

                                    <div className="row mr-4">
                                        <div className="col-8">
                                            <h4>
                                                Robogrow's Birthday:
                                            </h4>

                                            <h5 className="text-success">07:00:00 PM - June 11th, 2020</h5>
                                        </div>
                                        <div className="col-4">
                                            <img className="img-fluid"
                                                 src="https://i.ya-webdesign.com/images/portal-cake-png-1.png"
                                                 alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-12 mb-5">
                                <img style={{width: "500px"}} className="img-fluid rounded shadow"
                                     src="https://lh3.googleusercontent.com/-ShDJ2LtMQwI/XwiataI8nEI/AAAAAAABGxI/WK92K8gC3RM3bnclWqu8o7S9wE06WUFmQCK8BGAsYHg/s0/2020-07-10.png"
                                     alt=""/>
                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-12 mb-5">
                                <div className="p-4">
                                    <strong>New Web Interface</strong>

                                    <p>
                                        Finally, a user friendly interface! Built entirely with react, it has been a
                                        fun but very hard challenge to learn all these new technologies at once.
                                        <br/>
                                        <br/>
                                        Using JWT (Json Web Token) users are now able to register / login and create
                                        grows and configurations. I need to polish everything up and then get more
                                        serious about getting a professional board designed / printed.
                                    </p>

                                    <br/>

                                    <div className="row mr-4">
                                        <div className="col-8">
                                            <p>
                                                Came up with a decent 'workable' logo.I'll go and get this
                                                professionally remade soon.
                                            </p>
                                        </div>
                                        <div className="col-4">
                                            <img className="img-fluid"
                                                 src="/robogrow_drop_shadow.png"
                                                 alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="col-lg-6 col-md-6 col-sm-12 mb-5">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <img className="img-fluid"
                                             src="robogrow_3.png"
                                             alt=""/>
                                    </div>

                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                        <img className="img-fluid"
                                             src="robogrow_4_gradient_new_shadow.png"
                                             alt=""/>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-12 mb-5">
                                <div className="p-4">
                                    <strong>Evolution!</strong>

                                    <p>
                                        After many revisions, I settled on something... for now.
                                        <br/>
                                        This logo seems to be simple enough and recognizable at a distance. Also it
                                        embraces the <strong>love and compassion</strong> we all need to put into our
                                        plants to get the best results!
                                        <br/>
                                        <br/>
                                        I'm feeling really good, everything is starting to feel like it's coming
                                        together.
                                    </p>
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-12 mb-5">
                                <img style={{width: "500px"}} src="update_04.png" alt=""/>
                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-12 mb-5">
                                <div className="p-4">
                                    <strong>Hardware Upgrades</strong>
                                    
                                    <p>
                                        Added everything to this nice breadboard, mounted it to the wall.
                                        <br/>
                                        <br/>

                                        Got the 120v electrical wiring all laid out nicely with 4 individually
                                        controllable outlets. Added all the sensors to a 'probe' so that the overall
                                        design of the board will be more compact.
                                        <br/>
                                        <br/>
                                        Ran an entire crop with this system with full control over
                                        lights, exhaust, and watering control at the tip of my finger.
                                        <br/>
                                        <br/>
                                        Very awesome!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </body>
        )
            ;
    }
}