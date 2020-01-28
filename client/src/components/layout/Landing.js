import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert, clearAlert } from '../../actions/alert';
import { setErrors, clearErrors } from '../../actions/error';
import Spinner from '../layout/Spinner';

class Landing extends Component {
	render() {
		const { auth: { loading: hasLoadUser, isAuthenticated } } = this.props;
		return (
			<div className="landing">
				<div className="landing-inner">
					<div className="container">
						<div className="row">
							<div className="col-md-12 text-center">
								<h1 className="display-3 mb-4">Simple Register and Authentication</h1>
								<p className="lead">
									Build with Express, React and Mongo
								</p>
								<hr />
								{hasLoadUser ? <Spinner /> :
									!isAuthenticated ?
									<Fragment>
										<Link to="/register" className="btn btn-lg btn-primary mr-2">Sign Up</Link>
										<Link to="/login" className="btn btn-lg btn-light">Login</Link>
									</Fragment>
									:
									<Link to="/dashboard" className="btn btn-lg btn-info">Go to Profile</Link>
								}

							</div>
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

export default connect(mapStateToProps, { setAlert, clearErrors, clearAlert, setErrors })(
	Landing
);
