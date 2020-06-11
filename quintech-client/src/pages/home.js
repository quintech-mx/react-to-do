import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

// Material UI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Resources
import Logo from '../images/logo_circle.png';

const styles = (theme) => ({
	...theme.spreadThis,
});

class home extends Component {
	render() {
		const { classes } = this.props;
		return (
			<Grid container className={classes.formContainer} justify="center">
				<Grid item sm={4} xs={12} className={classes.form}>
					<img
						src={Logo}
						alt="To-Do logo"
						className={classes.homeLogo}
					/>
					<Typography variant="h1" className={classes.pageTitle}>
						Quintech To-Do
					</Typography>
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(home);
