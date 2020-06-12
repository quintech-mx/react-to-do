import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

// Material UI
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

// Material Icons
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';

// Redux stuff
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../redux/actions/userActions';

const styles = (theme) => ({
	...theme.spreadThis,
	profileName: {
		color: '#444',
	},
	profileUser: {
		fontSize: 16,
	},
	userBadge: {
		width: 35,
		height: 35,
		border: '2px solid #ccc',
		backgroundColor: '#4CAF50',
	},
	progressBar: {
		margin: '10px auto',
		width: '75%',
	},
});

class Profile extends Component {
	handleImageChange = (event) => {
		const image = event.target.files[0];
		const formData = new FormData();
		formData.append('image', image, image.name);
		this.props.uploadImage(formData);
	};
	handleEditPicture = () => {
		const fileInput = document.getElementById('imageInput');
		fileInput.click();
	};
	handleLogout = () => {
		this.props.logoutUser();
	};

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
					admin,
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
						<div className="image-wrapper">
							<Badge
								overlap="circle"
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'left',
								}}
								badgeContent={
									<Tooltip title="Nivel de usuario">
										<Avatar
											alt="Nivel de usuario"
											className={classes.userBadge}
										>
											{level}
										</Avatar>
									</Tooltip>
								}
							>
								<Avatar
									src={imageUrl}
									alt={name}
									className="profile-image"
								/>
							</Badge>
							<input
								type="file"
								id="imageInput"
								onChange={this.handleImageChange}
								hidden="hidden"
							/>
							<Tooltip title="Editar imagen de perfil">
								<IconButton
									onClick={this.handleEditPicture}
									className="button"
								>
									<EditIcon />
								</IconButton>
							</Tooltip>
						</div>
						<hr />
						<div className="profile-details">
							<MuiLink
								component={Link}
								to={`/users/${handle}`}
								variant="h4"
								className={classes.profileName}
								gutterBottom
								children={name}
							/>
							<hr />
							<MuiLink
								component={Link}
								to={`/users/${handle}`}
								className={classes.profileUser}
								color="primary"
								gutterBottom
								children={<p>@{handle}</p>}
							/>
							<hr />
							{!admin ? (
								<Fragment>
									<Typography variant="body2" gutterBottom>
										Nivel: {level}
									</Typography>
									<Typography variant="body2" gutterBottom>
										Puntos: {points} / {nextLevelPoints}
									</Typography>
									<LinearProgress
										value={(points * 100) / nextLevelPoints}
										valueBuffer={100}
										color="primary"
										variant="buffer"
										className={classes.progressBar}
									/>
									<hr />
								</Fragment>
							) : (
								<Fragment>
									<Typography
										variant="body2"
										color="primary"
										gutterBottom
									>
										Administrador
									</Typography>
									<hr />
								</Fragment>
							)}
							<hr />
							<CalendarToday color="primary" />{' '}
							<span>
								Se unió en{' '}
								{dayjs(createdAt).format('MMM[ de ]YYYY')}
							</span>
						</div>
						<Tooltip title="Cerrar sesión">
							<IconButton onClick={this.handleLogout}>
								<PowerSettingsNew color="primary" />
							</IconButton>
						</Tooltip>
						<Tooltip title="Editar nombre">
							<IconButton onClick={this.handleEditDetails}>
								<EditIcon color="primary" />
							</IconButton>
						</Tooltip>
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
	logoutUser: PropTypes.func.isRequired,
	uploadImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	user: state.user,
});

const mapActionsToProps = { logoutUser, uploadImage };

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(Profile));
