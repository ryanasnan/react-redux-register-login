import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { setAlert, clearAlert } from '../../actions/alert';
import { setErrors, clearErrors } from '../../actions/error';
import Spinner from '../layout/Spinner';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {},
		}
		this.props.clearAlert();
		this.props.clearErrors();
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		let stateObj = {};


		if (nextProps.errors) {
			stateObj = { ...stateObj, user: nextProps.auth.user };
		}
		return stateObj;
	}

	render() {
		const { auth: { loading: hasLoadUser, user } } = this.props;
		
		return (
			<div className="limiter">
				<p>Welcome</p>
				<div>
				{ hasLoadUser ? <Spinner /> : 
				<Fragment>
					<div>{user.name}</div>
					<div>{user.email}</div>
				</Fragment> 
				}
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

export default connect(mapStateToProps, { setAlert, clearErrors, clearAlert, setErrors })(
	Dashboard
);
