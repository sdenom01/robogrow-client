import React from 'react';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import {withRouter} from 'react-router-dom';
import * as Yup from 'yup';

import {authenticationService} from '../_services/authentication.service';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        // redirect to home if already logged in
        if (authenticationService.currentUserValue) {
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div className="container ml-auto mr-auto card p-4 shadow" style={{width: "550px", marginTop: "10%"}}>
                <Formik
                    initialValues={{
                        username: '',
                        email: '',
                        password: '',
                        confirmPassword: ''
                    }}
                    validationSchema={Yup.object().shape({
                        username: Yup.string().required('Username is required'),
                        email: Yup.string().required('Email is required'),
                        password: Yup.string().required('Password is required'),
                        confirmPassword: Yup.string().required('Confirm password is required')
                    })}
                    onSubmit={({username, email, password, confirmPassword}, {setStatus, setSubmitting}) => {
                        setStatus();
                        authenticationService.register(username, email, password, confirmPassword)
                            .then(
                                user => {
                                    const {from} = this.props.location.state || {from: {pathname: "/"}};
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
                                <label htmlFor="username">Username</label>
                                <Field name="username" type="text"
                                       className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')}/>
                                <ErrorMessage name="username" component="div" className="invalid-feedback"/>
                            </div>
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
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <Field name="confirmPassword" type="confirmPassword"
                                       className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')}/>
                                <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback"/>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Register</button>
                                {
                                    isSubmitting &&
                                    <img
                                        src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="/>
                                }
                            </div>
                            <div className="form-group">
                                <a className="float-right" href="/login">
                                    Already have an account?
                                </a>
                            </div>
                            {
                                status &&
                                status.map((error) => (
                                    <div className={'alert alert-danger'}>{error.msg}</div>
                                ))
                            }
                        </Form>
                    )}
                />
            </div>
        )
    }
}

export default withRouter(RegisterPage);