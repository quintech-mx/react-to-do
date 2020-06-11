import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import Logo from '../images/logo_circle.png';

// Material UI Icons

const styles = (theme) => ({
	...theme.spreadThis,
});

export class Navbar extends Component {
	render() {
		return (
			<AppBar>
				<Toolbar className="nav-container">
					<Link to="/">
						<img src={Logo} alt="Logo" className="navLogo" />
					</Link>
					<div className="navButtons">
						<Button color="inherit" component={Link} to="/">
							Home
						</Button>
						<Button color="inherit" component={Link} to="/login">
							Log In
						</Button>
						<Button color="inherit" component={Link} to="/signup">
							Sign Up
						</Button>
					</div>
				</Toolbar>
			</AppBar>
		);
	}
}

export default withStyles(styles)(Navbar);
