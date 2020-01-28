import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAlert, clearAlert } from '../../actions/alert';
import { setErrors, clearErrors } from '../../actions/error';

class About extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
		this.props.clearAlert();
		this.props.clearErrors();
	}

	render() {
		return (
			 <div className="limiter">
				<p>About</p>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	errors: state.errors,
	alert: state.alert
});

export default connect(mapStateToProps, { setAlert, clearAlert, setErrors, clearErrors })(About);