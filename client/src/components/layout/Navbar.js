import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

class Navbar extends Component {
	onLogoutClick(e) {
		e.preventDefault();
		this.props.logout();
	}

	render() {
		const { auth: { isAuthenticated, loading } } = this.props;

		const authLinks = (
			<ul className="navbar-nav ml-auto">
				<li className="nav-item">
					<Link to="#" onClick={this.onLogoutClick.bind(this)} className="nav-link">
						Logout
					</Link>
				</li>
			</ul>
		);

		const guestLinks = (
			<ul className="navbar-nav ml-auto">
				<li className="nav-item">
					<Link className="nav-link" to="/register">
						Sign Up
			  </Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/login">
						Login
			  </Link>
				</li>
			</ul>
		);

		return (
			<nav className="navbar navbar-expand-sm navbar-dark bg-blue mb-4">
				<div className="container">
					<Link className="navbar-brand" to="/">MERN Credential</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#mobile-nav"
					>
						<span className="navbar-toggler-icon" />
					</button>

					<div className="collapse navbar-collapse" id="mobile-nav">
						{!loading && (
							<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
						)}
					</div>
				</div>
			</nav>
		);
	}
}


const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logout })(
	Navbar
);
