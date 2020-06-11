import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

// Material UI
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

// Material Icons
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';

// Redux stuff
import { connect } from 'react-redux';
import dayjs from 'dayjs';

const styles = (theme) => ({
	...theme.spreadThis,
	profileUser: {
		fontSize: 14,
	},
	userBadge: {
		width: 22,
		height: 22,
		border: '2px solid #ccc',
		backgroundColor: '#4CAF50',
	},
});

class Profile extends Component {
	render() {
		const {
			classes,
			user: {
				credentials: {
					handle,
					createdAt,
					imageUrl,
					name,
					points,
					level,
				},
				loading,
				authenticated,
			},
		} = this.props;

		const nextLevelPoints =
			level === 1
				? 6
				: level === 2
				? 15
				: level === 3
				? 27
				: level === 4
				? 42
				: 60;

		let profileMarkup = !loading ? (
			authenticated ? (
				<Paper className={classes.paper}>
					<div className={classes.profile}>
						<div className="profile-image">
							<Badge
								overlap="circle"
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'right',
								}}
								badgeContent={
									<Avatar
										alt="Nivel de usuario"
										className={classes.userBadge}
									>
										{level}
									</Avatar>
								}
							>
								<Avatar src={imageUrl} alt={name} />
							</Badge>
						</div>
						<hr />
						<div className="profile-details">
							<MuiLink
								component={Link}
								to={`/users/${handle}`}
								variant="h5"
								gutterBottom
							>
								{name}
							</MuiLink>
							<MuiLink
								component={Link}
								to={`/users/${handle}`}
								className={classes.profileUser}
								color="textSecondary"
								gutterBottom
							>
								@{handle}
							</MuiLink>
							<Typography variant="body2" gutterBottom>
								Nivel: {level}
							</Typography>
							<Typography variant="body2" color="textSecondary">
								Puntos: {points} / {nextLevelPoints}
							</Typography>
							<LinearProgress
								value={(points * 100) / nextLevelPoints}
								color="primary"
							/>
							<hr />
							<CalendarToday color="primary" />{' '}
							<span>
								Se unió {dayjs(createdAt).format('MMM YYYY')}
							</span>
						</div>
					</div>
				</Paper>
			) : (
				<Paper className={classes.paper}>
					<Typography variant="body2" align="center">
						No se encontró ningún perfil, por favor incia sesión o
						regístrate
					</Typography>
					<div className={classes.buttons}>
						<Button
							variant="outlined"
							color="primary"
							component={Link}
							to={'/login'}
						>
							Log In
						</Button>
						<Button
							variant="outlined"
							color="secondary"
							component={Link}
							to={'/signup'}
						>
							Sign Up
						</Button>
					</div>
				</Paper>
			)
		) : (
			<p>Loading...</p>
		);
		return profileMarkup;
	}
}

Profile.propTypes = {
	user: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Profile));
