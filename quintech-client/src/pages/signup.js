import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Material UI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux stuff
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

const styles = (theme) => ({
	...theme.spreadThis,
});

class signup extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			handle: '',
			email: '',
			password: '',
			confirmPassword: '',
			errors: {
				email: '',
				password: '',
				handle: '',
				general: '',
			},
		};
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.UI.errors) {
			this.setState({ errors: nextProps.UI.errors });
		}
	}
	handleSubmit = (event) => {
		event.preventDefault();
		this.setState({ loading: true });
		const newUserData = {
			name: this.state.name,
			handle: this.state.handle,
			email: this.state.email,
			password: this.state.password,
			confirmPassword: this.state.confirmPassword,
		};
		this.props.signupUser(newUserData, this.props.history);
	};
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};
	render() {
		const {
			classes,
			UI: { loading },
		} = this.props;
		const { errors } = this.state;
		return (
			<Grid container className={classes.formContainer} justify="center">
				<Grid item sm={4} xs={12} className={classes.form}>
					<Typography variant="h1" className={classes.pageTitle}>
						Sign Up
					</Typography>
					<form noValidate onSubmit={this.handleSubmit}>
						<TextField
							id="name"
							name="name"
							type="text"
							label="Nombre"
							className={classes.textField}
							helperText={errors.name}
							error={errors.name ? true : false}
							value={this.state.name}
							onChange={this.handleChange}
							fullWidth
						/>
						<TextField
							id="handle"
							name="handle"
							type="text"
							label="Usuario"
							className={classes.textField}
							helperText={errors.handle}
							error={errors.handle ? true : false}
							value={this.state.handle}
							onChange={this.handleChange}
							fullWidth
						/>
						<TextField
							id="email"
							name="email"
							type="email"
							label="Email"
							className={classes.textField}
							helperText={errors.email}
							error={errors.email ? true : false}
							value={this.state.email}
							onChange={this.handleChange}
							fullWidth
						/>
						<TextField
							id="password"
							name="password"
							type="password"
							label="Contraseña"
							className={classes.textField}
							helperText={errors.password}
							error={errors.password ? true : false}
							value={this.state.password}
							onChange={this.handleChange}
							fullWidth
						/>
						<TextField
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							label="Confirmar contraseña"
							className={classes.textField}
							helperText={errors.confirmPassword}
							error={errors.confirmPassword ? true : false}
							value={this.state.confirmPassword}
							onChange={this.handleChange}
							fullWidth
						/>
						{errors.general && (
							<Typography
								variant="body2"
								className={classes.customError}
							>
								{errors.general}
							</Typography>
						)}
						<Button
							type="submit"
							variant="outlined"
							color="primary"
							className={classes.button}
							disabled={loading}
						>
							{!loading && 'Log In'}
							{loading && (
								<CircularProgress
									size={20}
									className={classes.progress}
								/>
							)}
						</Button>
						<small className={classes.smallLine}>
							¿Ya estás registado?
							<Link to="/login"> Inicia sesión</Link>
						</small>
					</form>
				</Grid>
			</Grid>
		);
	}
}

signup.propTypes = {
	classes: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
	signupUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	user: state.user,
	UI: state.UI,
});

export default connect(mapStateToProps, { signupUser })(
	withStyles(styles)(signup)
);
