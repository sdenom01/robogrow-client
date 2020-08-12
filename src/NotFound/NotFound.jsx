import React from 'react';
import {Link} from 'react-router-dom';

class NotFoundPage extends React.Component {
    render() {
        return (
            <div className="container text-center">
                <img className="col-6" src="./robogrow_404.png"/>

                <div>
                    <p style={{textAlign: "center"}}>
                        <Link to="/">Take me home! </Link>
                    </p>
                </div>
            </div>
        );
    }
}

export default NotFoundPage;
