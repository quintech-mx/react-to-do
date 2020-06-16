import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

// Util
import MyButton from '../util/MyButton';

// Material UI
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

// Material Icons
import UpdateIcon from '@material-ui/icons/Update';
import CompleteIcon from '@material-ui/icons/AssignmentTurnedIn';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';

// Redux stuff
import { connect } from 'react-redux';
import {
	editTaskDetails,
	updateTaskStatus,
} from '../redux/actions/dataActions';

dayjs.locale('es');

const styles = (theme) => ({
	...theme.spreadThis,
});

class Task extends Component {
	state = {
		name: '',
		details: '',
		assignee: '',
		status: '',
		openEdit: false,
		openStatus: false,
	};
	mapTaskDetailsToState = (task) => {
		this.setState({
			name: task.name,
			details: task.details,
			assignee: task.assignee,
			status: task.status,
		});
	};
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	// Edit task functions
	handleOpenEdit = () => {
		this.setState({ openEdit: true });
		this.mapTaskDetailsToState(this.props.task);
	};
	handleCloseEdit = () => {
		this.setState({ openEdit: false });
	};
	handleSubmitEdit = () => {
		const taskData = {
			name: this.state.name,
			details: this.state.details,
			assignee: this.state.assignee,
		};
		const taskId = this.props.task.taskId;
		this.props.editTaskDetails(taskData, taskId);
		this.handleCloseEdit();
	};

	// Update status functions
	handleOpenStatus = () => {
		this.setState({ openStatus: true });
		this.mapTaskDetailsToState(this.props.task);
	};
	handleCloseStatus = () => {
		this.setState({ openStatus: false });
	};
	handleSubmitStatus = () => {
		const taskStatus = {
			status: this.state.status,
		};
		const taskId = this.props.task.taskId;
		this.props.updateTaskStatus(taskStatus, taskId);
		this.handleCloseStatus();
	};
	handleComplete = () => {
		const completeStatus = {
			status: 'Completada',
		};
		const taskId = this.props.task.taskId;
		this.props.updateTaskStatus(completeStatus, taskId);
	};
	componentDidMount() {
		const { task } = this.props;
		this.mapTaskDetailsToState(task);
	}
	render() {
		const {
			classes,
			task: { name, details, createdAt, status },
			user: { authenticated },
		} = this.props;
		let completedTask = false;
		if (authenticated) {
			return (
				<Grid item xs={12} sm={6} md={4}>
					<Card className={classes.root} spacing={2}>
						<CardContent>
							{status === 'Completada' ? (
								<Typography
									className={classes.statusComplete}
									gutterBottom
								>
									{status}
								</Typography>
							) : status === 'No se ha empezado' ? (
								<Typography
									className={classes.statusNotStarted}
									gutterBottom
								>
									{status}
								</Typography>
							) : status === 'En Progreso' ? (
								<Typography
									className={classes.statusInProgress}
									gutterBottom
								>
									{status}
								</Typography>
							) : (
								<Typography
									className={classes.statusDelayed}
									gutterBottom
								>
									{status}
								</Typography>
							)}
							<Typography variant="h5" component="h2">
								{name}
							</Typography>
							{/* <Typography
								className={classes.assigned}
								color="textSecondary"
							>
								Asignado por {assigner}
								{' el '}
								{dayjs(createdAt).format('D[ de ]MMM[ de ]YYYY')}
							</Typography> */}
							<Typography
								className={classes.assigned}
								color="textSecondary"
							>
								Creada{' el '}
								{dayjs(createdAt).format(
									'D[ de ]MMM[ de ]YYYY'
								)}
							</Typography>
							<Typography variant="body1" component="p">
								{details}
							</Typography>
						</CardContent>
						<CardActions className={classes.taskButtons}>
							{status !== 'Completada' ? (
								<Fragment>
									<Fragment>
										<MyButton
											tip="Editar tarea"
											onClick={this.handleOpenEdit}
											btnClassName="editTask"
										>
											<EditIcon />
										</MyButton>
										<Dialog
											open={this.state.openEdit}
											onClose={this.handleCloseEdit}
											fullWidth
											maxWidth="md"
										>
											<DialogTitle>
												Editar tarea
											</DialogTitle>
											<DialogContent>
												<form>
													<TextField
														name="name"
														tpye="text"
														label="Nombre"
														placeholder="Nombre de la tarea"
														className={
															classes.textField
														}
														value={this.state.name}
														onChange={
															this.handleChange
														}
														fullWidth
													/>
													<TextField
														name="details"
														tpye="text"
														label="Detalles"
														multiline
														rows={3}
														placeholder="Descripción de la tarea"
														className={
															classes.textField
														}
														value={
															this.state.details
														}
														onChange={
															this.handleChange
														}
														fullWidth
													/>
													<input
														type="text"
														hidden="hidden"
														value={
															this.state.assignee
														}
														onChange={
															this.handleChange
														}
													/>
												</form>
											</DialogContent>
											<DialogActions>
												<Button
													onClick={
														this.handleCloseEdit
													}
													color="primary"
												>
													Cancelar
												</Button>
												<Button
													onClick={
														this.handleSubmitEdit
													}
													color="primary"
												>
													Guardar
												</Button>
											</DialogActions>
										</Dialog>
									</Fragment>
									<MyButton
										tip="Cambiar estado"
										btnClassName="updateTask"
										onClick={this.handleOpenStatus}
									>
										<UpdateIcon />
									</MyButton>
									<Dialog
										open={this.state.openStatus}
										onClose={this.handleCloseStatus}
										fullWidth
										maxWidth="sm"
									>
										<DialogTitle>
											Cambiar estado
										</DialogTitle>
										<DialogContent>
											<form>
												<InputLabel id="estado">
													Estado
												</InputLabel>
												<Select
													name="status"
													labelId="estado"
													id="select-estado"
													value={this.state.status}
													onChange={this.handleChange}
													fullWidth
												>
													<MenuItem
														value={
															'No se ha empezado'
														}
													>
														No se ha empezado
													</MenuItem>
													<MenuItem
														value={'En Progreso'}
													>
														En Progreso
													</MenuItem>
													<MenuItem
														value={'Retrasada'}
													>
														Retrasada
													</MenuItem>
												</Select>
											</form>
										</DialogContent>
										<DialogActions>
											<Button
												onClick={this.handleCloseStatus}
												color="primary"
											>
												Cancelar
											</Button>
											<Button
												onClick={
													this.handleSubmitStatus
												}
												color="primary"
											>
												Actualizar
											</Button>
										</DialogActions>
									</Dialog>
									<MyButton
										tip="Completar tarea"
										btnClassName="completeTask"
										onClick={this.handleComplete}
									>
										<CompleteIcon />
									</MyButton>
								</Fragment>
							) : (
								(completedTask = true)
							)}
						</CardActions>
						{completedTask ? (
							<div className="completedContainer">
								<DoneIcon className={classes.statusComplete} />
							</div>
						) : (
							true
						)}
					</Card>
				</Grid>
			);
		} else {
			return true;
		}
	}
}

Task.propTypes = {
	user: PropTypes.object.isRequired,
	task: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	editTaskDetails: PropTypes.func.isRequired,
	updateTaskStatus: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	user: state.user,
	authenticated: state.user.authenticated,
	tasks: state.tasks,
});

const mapStateToActions = {
	editTaskDetails,
	updateTaskStatus,
};

export default connect(
	mapStateToProps,
	mapStateToActions
)(withStyles(styles)(Task));
