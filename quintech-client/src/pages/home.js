import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';

// Material UI
import Grid from '@material-ui/core/Grid';

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
				console.log(res.data);
				this.setState({
					tasks: res.data,
				});
			})
			.catch((err) => console.error(err));
	}
	render() {
		let ownTasksMarkup = this.state.tasks ? (
			this.state.tasks.map((task) => <p>{task.details}</p>)
		) : (
			<p>Loading...</p>
		);
		return (
			<Grid container spacing={2}>
				<Grid item sm={3} xs={12}>
					<p>Perfil</p>
				</Grid>
				<Grid item sm={9} xs={12}>
					{ownTasksMarkup}
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(home);
