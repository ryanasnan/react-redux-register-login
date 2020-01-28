import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Dashboard from '../dashboard/Dashboard';
import PrivateRoute from './PrivateRoute';
import NotFound from '../layout/NotFound';
import Alert from '../layout/Alert';
import AuthRoute from './AuthRoute';
import About from '../about/About';

// AuthRoute is used for change to login or register but user already login

const Routes = () => {
	return (
		<div className="container">
			<div className="row">
				<div className="col-md-8 m-auto">
					<Alert />
					<Switch>
						<AuthRoute exact path="/register" component={Register} />
						<AuthRoute exact path="/login" component={Login} />
						<Route exact path="/about" component={About} />
						<PrivateRoute exact path="/dashboard" component={Dashboard} />
						<Route component={NotFound} />
					</Switch>
				</div>
			</div>
		</div>
	);
};

export default Routes;
