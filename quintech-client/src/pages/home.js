import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';

// Material UI
import Grid from '@material-ui/core/Grid';

// Components
import Task from '../components/Task';
import Profile from '../components/Profile';

const styles = (theme) => ({
	...theme.spreadThis,
});

class home extends Component {
	state = {
		tasks: null,
	};
	componentDidMount() {
		axios
			.get('/my-tasks')
			.then((res) => {
				this.setState({
					tasks: res.data,
				});
			})
			.catch((err) => console.error(err));
	}
	render() {
		let ownTasksMarkup = this.state.tasks ? (
			this.state.tasks.map((task) => (
				<Task key={task.taskId} task={task} />
			))
		) : (
			<p>Loading...</p>
		);
		return (
			<Grid container spacing={2}>
				<Grid item sm={3} xs={12}>
					<Profile />
				</Grid>
				<Grid item sm={9} xs={12} container spacing={2}>
					{ownTasksMarkup}
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(home);
