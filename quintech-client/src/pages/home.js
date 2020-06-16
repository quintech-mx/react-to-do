import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// Material UI
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

// Components
import Task from '../components/Task';
import Profile from '../components/Profile';
import AddTask from '../components/AddTask';

// Redux stuff
import { connect } from 'react-redux';
import { getAllTasksData } from '../redux/actions/dataActions';

const styles = (theme) => ({
	...theme.spreadThis,
});

class home extends Component {
	componentDidMount() {
		this.props.getAllTasksData();
	}
	render() {
		const {
			classes,
			data: { tasks, loading },
		} = this.props;
		let ownTasksMarkup = !loading ? (
			tasks.map((task) => <Task key={task.taskId} task={task} />)
		) : (
			<div className={classes.loadingHolder}>
				<CircularProgress size={70} className={classes.progressData} />
			</div>
		);
		return (
			<Fragment>
				<Grid container spacing={2}>
					<Grid item sm={3} xs={12}>
						<Profile />
					</Grid>
					<Grid item sm={9} xs={12} container spacing={2}>
						{ownTasksMarkup}
					</Grid>
				</Grid>
				<AddTask />
			</Fragment>
		);
	}
}

home.propTypes = {
	classes: PropTypes.object.isRequired,
	getAllTasksData: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	data: state.data,
});

const mapStateToActions = {
	getAllTasksData,
};

export default connect(
	mapStateToProps,
	mapStateToActions
)(withStyles(styles)(home));
