import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';

import Routes from './components/routing/Routes';
import { Provider } from 'react-redux';
import store from './store';

import jwt_decode from 'jwt-decode';
import { logout, loadUser } from './actions/auth';

import './App.css';

if (localStorage.jwtToken) {
	const decoded = jwt_decode(localStorage.jwtToken);

	// // Check for expired token
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		// Logout user
		store.dispatch(logout());
		// Redirect to login
		window.location.href = '/login';
	}
}
store.dispatch(loadUser());

function App() {
	return (
		<Provider store={store}>
			<Router>
				<div className="App">
					<Navbar />
					<Switch>
						<Route exact path="/" component={Landing} />
						<Route component={Routes} />
					</Switch>
					<Footer />
				</div>
			</Router>

		</Provider>
	);
}

export default App;
