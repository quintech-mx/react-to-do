import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import Logo from '../images/logo_circle.png';

// Util
import MyButton from '../util/MyButton';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

// Material UI Icons
import HomeIcon from '@material-ui/icons/Home';

import { connect } from 'react-redux';

const styles = (theme) => ({
	...theme.spreadThis,
});

export class Navbar extends Component {
	render() {
		const { authenticated } = this.props;
		return (
			<AppBar>
				<Toolbar className="nav-container">
					<Link to="/">
						<img src={Logo} alt="Logo" className="navLogo" />
					</Link>
					<div className="navButtons">
						{authenticated ? (
							<MyButton tip="Inicio">
								<HomeIcon />
							</MyButton>
						) : (
							<Fragment>
								<Button color="inherit" component={Link} to="/">
									Inicio
								</Button>
								<Button
									color="inherit"
									component={Link}
									to="/login"
								>
									Log In
								</Button>
								<Button
									color="inherit"
									component={Link}
									to="/signup"
								>
									Sign Up
								</Button>
							</Fragment>
						)}
					</div>
				</Toolbar>
			</AppBar>
		);
	}
}

const mapStateToProps = (state) => ({
	authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(withStyles(styles)(Navbar));
