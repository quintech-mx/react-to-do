import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// Util
import MyButton from '../util/MyButton';

// Material UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

// Material Icons
import AddIcon from '@material-ui/icons/Add';

// Redux stuff
import { connect } from 'react-redux';
import { createTask } from '../redux/actions/dataActions';

const styles = (theme) => ({
	...theme.spreadThis,
});

class AddTask extends Component {
	state = {
		name: '',
		details: '',
		assignee: '',
		open: false,
	};
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};
	handleOpen = () => {
		this.setState({ open: true });
	};
	handleClose = () => {
		this.setState({ open: false });
	};
	handleSubmit = () => {
		const taskData = {
			name: this.state.name,
			details: this.state.details,
			assignee: this.props.user.credentials.handle,
		};
		this.props.createTask(taskData);
		this.handleClose();
	};
	render() {
		const { classes } = this.props;
		return (
			<Fragment>
				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					fullWidth
					maxWidth="md"
				>
					<DialogTitle>Agregar tarea</DialogTitle>
					<DialogContent>
						<form>
							<TextField
								name="name"
								tpye="text"
								label="Nombre"
								placeholder="Nombre de la tarea"
								className={classes.textField}
								value={this.state.name}
								onChange={this.handleChange}
								fullWidth
							/>
							<TextField
								name="details"
								tpye="text"
								label="Detalles"
								multiline
								rows={3}
								placeholder="Descripción de la tarea"
								className={classes.textField}
								value={this.state.details}
								onChange={this.handleChange}
								fullWidth
							/>
							<input
								type="text"
								hidden="hidden"
								value={this.state.assignee}
								onChange={this.handleChange}
							/>
						</form>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClose} color="primary">
							Cancelar
						</Button>
						<Button onClick={this.handleSubmit} color="primary">
							Agregar
						</Button>
					</DialogActions>
				</Dialog>
				<div className="newTaskBtnContainer">
					<MyButton tip="Nueva tarea" onClick={this.handleOpen}>
						<AddIcon />
					</MyButton>
				</div>
			</Fragment>
		);
	}
}

AddTask.propTypes = {
	UI: PropTypes.object.isRequired,
	createTask: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	UI: state.UI,
	user: state.user,
});

export default connect(mapStateToProps, { createTask })(
	withStyles(styles)(AddTask)
);
