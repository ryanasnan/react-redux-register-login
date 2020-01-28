import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

const AuthRoute = ({ component: Component, auth, ...rest }) => (
	<Route
		{...rest}
		render={props => {
			if (auth.loading) {
				return <Spinner mainLoading={true}/>
			}
			else {
				if (!auth.isAuthenticated) {
					return (
						<Component {...props} />
					)
				}
				else {
					return (
						<Redirect to='/dashboard' />						
					)
				}

			}
		}
		}
	/>
);


const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(AuthRoute);
