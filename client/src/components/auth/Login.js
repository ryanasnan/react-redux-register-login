import React, { Component } from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/auth';
import { setAlert, clearAlert } from '../../actions/alert';
import { setErrors, clearErrors } from '../../actions/error';
import validatePostInput from '../../validation/login';
import { isObjectEmpty } from '../../utils/helper';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			alert: {},
			errors: {}
		};
		this.props.clearAlert();
		this.props.clearErrors();
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.auth.isAuthenticated) {
			nextProps.history.push('/dashboard');
		}

		let stateObj = {};

		if (nextProps.alert) {
			stateObj = { ...stateObj, errors: nextProps.errors };
		}
		return stateObj;
	}

	onSubmit = e => {
		e.preventDefault();

		const userData = {
			email: this.state.email,
			password: this.state.password
		};

		const { errors, isValid } = validatePostInput(userData);
		// check input validation
		if (!isValid) {
			this.props.setErrors(errors);
			this.props.setAlert('Error Input Validation', 'danger');
		} else {
			this.props.loginUser(userData);

		}

	}

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	}


	render() {
		const { errors, alert } = this.state;

		return (
			<div className="login">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Log In</h1>
							{/* empty object itu gak true, akan aku perbaiki nanti pake utils/helper */}
							{!isObjectEmpty(alert) && <p className={`lead text-center text-${alert.type}`}>{alert.text}</p>}

							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder="Email Address"
									name="email"
									type="email"
									value={this.state.email}
									onChange={this.onChange}
									error={errors.email}
								/>

								<TextFieldGroup
									placeholder="Password"
									name="password"
									type="password"
									value={this.state.password}
									onChange={this.onChange}
									error={errors.password}
								/>
								<input type="submit" className="btn btn-info btn-block mt-4" />
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
	alert: state.alert
});

export default connect(mapStateToProps, { loginUser, setAlert, clearAlert, setErrors, clearErrors })(withRouter(Login));