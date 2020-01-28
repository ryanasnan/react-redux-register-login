import React, { Component, Fragment } from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/auth';
import validateRegisterInput from '../../validation/register';
import { setAlert, clearAlert } from '../../actions/alert';
import { setErrors, clearErrors } from '../../actions/error';

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			password: '',
			passwordConfirmation: '',
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

		if (nextProps.errors) {
			stateObj = { ...stateObj, errors: nextProps.errors };
		}
		return stateObj;
	}

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit = e => {
		e.preventDefault();

		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			passwordConfirmation: this.state.passwordConfirmation
		};

		const { errors, isValid } = validateRegisterInput(newUser);

		// check input validation, else do register
		if (!isValid) {
			this.props.setErrors(errors);
			this.props.setAlert('Error Input Validation', 'danger');
		} else {
			this.props.registerUser(newUser, this.props.history);
		}

	}

	render() {
		const { errors } = this.state;

		return (
			<Fragment>
				<h1 className="display-4 text-center">Sign Up</h1>
				<form onSubmit={this.onSubmit}>
					<TextFieldGroup
						placeholder="Name"
						name="name"
						value={this.state.name}
						onChange={this.onChange}
						error={errors.name}
					/>
					<TextFieldGroup
						placeholder="Email"
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
						info="Password minimal 8 character"
						error={errors.password}
					/>
					<TextFieldGroup
						placeholder="Confirm Password"
						name="passwordConfirmation"
						type="password"
						value={this.state.passwordConfirmation}
						onChange={this.onChange}
						error={errors.passwordConfirmation}
					/>
					<input type="submit" className="btn btn-info btn-block mt-4" />
				</form>
			</Fragment>
		)
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { registerUser, setAlert, clearErrors, clearAlert, setErrors })(withRouter(Register));
