import React from 'react';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import {withRouter} from 'react-router-dom';
import * as Yup from 'yup';

import {authenticationService} from '../_services/authentication.service';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // redirect to home if already logged in
        if (authenticationService.currentUserValue) {
            this.props.history.push('/grows');
        }
    }

    render() {
        return (
            <div className="container ml-auto mr-auto card p-4 shadow" style={{width: "530px", marginTop: "10%"}}>
                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    validationSchema={Yup.object().shape({
                        email: Yup.string().required('Email is required'),
                        password: Yup.string().required('Password is required')
                    })}
                    onSubmit={({email, password}, {setStatus, setSubmitting}) => {
                        setStatus();
                        authenticationService.login(email, password)
                            .then(
                                user => {
                                    const {from} = this.props.location.state || {from: {pathname: "/grows"}};
                                    this.props.history.push(from);
                                },
                                error => {
                                    setSubmitting(false);
                                    setStatus(error);
                                }
                            );
                    }}
                    render={({errors, status, touched, isSubmitting}) => (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Field name="email" type="text"
                                       className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}/>
                                <ErrorMessage name="email" component="div" className="invalid-feedback"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Field name="password" type="password"
                                       className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')}/>
                                <ErrorMessage name="password" component="div" className="invalid-feedback"/>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Login</button>
                                {/*{*/}
                                    {/*isSubmitting &&*/}
                                    {/*<img*/}
                                        {/*src="https://i.pinimg.com/originals/65/ba/48/65ba488626025cff82f091336fbf94bb.gif"/>*/}
                                {/*}*/}
                            </div>

                            {
                                status && status.length &&
                                status.map((error) => (
                                    <div className={'alert alert-danger'}>{error.msg}</div>
                                ))
                            }

                            <div className="form-group text-right">
                                <a href="/register">
                                    Need to register?
                                </a>
                            </div>
                        </Form>
                    )}
                />
            </div>
        )
    }
}

export default withRouter(LoginPage);