import { SET_TASKS, LOADING_DATA, UPDATE_STATUS, ADD_TASK } from '../types';

const initialState = {
	loading: false,
	tasks: [],
	task: {},
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_TASKS:
			return {
				...state,
				tasks: action.payload,
				loading: false,
			};
		case LOADING_DATA:
			return {
				...state,
				loading: true,
			};
		case UPDATE_STATUS:
			let index = state.tasks.findIndex(
				(task) => task.taskId === action.payload.taskId
			);
			state.tasks[index] = action.payload;
			state.tasks[index].status = action.payload.status;
			return {
				...state,
			};
		case ADD_TASK:
			return {
				...state,
				tasks: [action.payload, ...state.tasks],
			};
		default:
			return state;
	}
}
