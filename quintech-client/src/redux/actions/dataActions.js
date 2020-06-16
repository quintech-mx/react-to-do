import {
	LOADING_DATA,
	SET_TASKS,
	UPDATE_STATUS,
	LOADING_UI,
	SET_ERRORS,
	CLEAR_ERRORS,
	ADD_TASK,
} from '../types';
import axios from 'axios';

// User actions
import { getUserData } from './userActions';

export const createTask = (taskData) => (dispatch) => {
	dispatch({ type: LOADING_UI });
	axios
		.post('/task', taskData)
		.then((res) => {
			dispatch({
				type: ADD_TASK,
				payload: res.data,
			});
		})
		.catch((err) => {
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data,
			});
			dispatch({ type: CLEAR_ERRORS });
		});
};

export const editTaskDetails = (taskDetails, taskId) => (dispatch) => {
	dispatch({ type: LOADING_DATA });
	axios
		.post(`/task/${taskId}/edit`, taskDetails)
		.then(() => {
			dispatch(getAllTasksData());
		})
		.catch((err) => {
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data,
			});
			dispatch({ type: CLEAR_ERRORS });
		});
};

export const updateTaskStatus = (taskStatus, taskId) => (dispatch) => {
	dispatch({ type: LOADING_DATA });

	axios
		.post(`/task/${taskId}/update`, taskStatus)
		.then((res) => {
			if (taskStatus === 'Completada') {
				dispatch(getUserData());
			}
			dispatch({
				type: UPDATE_STATUS,
				payload: res.data,
			});
			dispatch(getAllTasksData());
		})
		.catch((err) => {
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data,
			});
			dispatch({ type: CLEAR_ERRORS });
		});
};

export const getAllTasksData = () => (dispatch) => {
	dispatch({ type: LOADING_DATA });
	axios
		.get('/tasks')
		.then((res) => {
			dispatch({
				type: SET_TASKS,
				payload: res.data,
			});
		})
		.catch((err) => console.error(err));
};
