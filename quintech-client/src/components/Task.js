import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';

// Material UI
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

// Material Icons
import UpdateIcon from '@material-ui/icons/Update';
import CompleteIcon from '@material-ui/icons/AssignmentTurnedIn';

dayjs.locale('es');

const styles = (theme) => ({
	...theme.spreadThis,
	status: {
		fontSize: 13,
	},
	statusComplete: {
		color: '#4CAF50',
	},
	statusNotStarted: {
		color: 'rgba(0, 0, 0, 0.54)',
	},
	statusInProgress: {
		color: '#03A9F4',
	},
	statusDelayed: {
		color: '#FFAB00',
	},
	assigned: {
		fontSize: 14,
	},
	taskButtons: {
		justifyContent: 'flex-end',
		'& *': {
			color: '#fff',
		},
		'& .updateTask': {
			backgroundColor: '#FB8C00',
		},
		'& .completeTask': {
			backgroundColor: '#4CAF50',
		},
	},
	disabledButton: {
		backgroundColor: 'rgba(0, 0, 0, 0.3) !important',
		color: '#fff !important',
	},
});

class Task extends Component {
	render() {
		const {
			classes,
			task: {
				name,
				details,
				createdAt,
				status,
				taskId,
				assigner,
				assignee,
			},
		} = this.props;
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
						<Typography
							className={classes.assigned}
							color="textSecondary"
						>
							Asignado por {assigner}
							{' el '}
							{dayjs(createdAt).format('D[ de ]MMM[ de ]YYYY')}
						</Typography>
						<Typography variant="body2" component="p">
							{details}
						</Typography>
					</CardContent>
					<CardActions className={classes.taskButtons}>
						{status !== 'Completada' ? (
							<Fragment>
								<Tooltip title="Cambiar estado">
									<IconButton
										size="medium"
										className="updateTask"
									>
										<UpdateIcon />
									</IconButton>
								</Tooltip>
								<Tooltip title="Completar tarea">
									<IconButton
										size="medium"
										className="completeTask"
									>
										<CompleteIcon />
									</IconButton>
								</Tooltip>
							</Fragment>
						) : (
							<Fragment>
								<IconButton
									size="medium"
									className={classes.disabledButton}
									disabled={true}
								>
									<UpdateIcon />
								</IconButton>
								<IconButton
									size="medium"
									className={classes.disabledButton}
									disabled={true}
								>
									<CompleteIcon />
								</IconButton>
							</Fragment>
						)}
					</CardActions>
				</Card>
			</Grid>
		);
	}
}

export default withStyles(styles)(Task);
