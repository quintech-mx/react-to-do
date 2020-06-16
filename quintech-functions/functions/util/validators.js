const isEmail = (email) => {
	const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (email.match(regEx)) return true;
	return false;
};

const isEmpty = (string) => {
	if (string.trim() === '') return true;
	return false;
};

exports.validateSignupData = (data) => {
	let errors = {};

	if (isEmpty(data.email)) {
		errors.email = 'Este campo es requerido';
	} else if (!isEmail(data.email)) {
		errors.email = 'Must be a valid email address';
	}

	if (isEmpty(data.password)) errors.password = 'Este campo es requerido';
	if (data.password !== data.confirmPassword)
		errors.confirmPassword = 'Passwords must match';
	if (isEmpty(data.handle)) errors.handle = 'Este campo es requerido';

	return {
		errors,
		valid: Object.keys(errors).length == 0 ? true : false,
	};
};

exports.validateLoginData = (data) => {
	let errors = {};

	if (isEmpty(data.email)) errors.email = 'Este campo es requerido';
	if (isEmpty(data.password)) errors.password = 'Este campo es requerido';

	return {
		errors,
		valid: Object.keys(errors).length == 0 ? true : false,
	};
};

exports.validateNewTaskData = (data) => {
	let errors = {};

	if (isEmpty(data.name)) errors.name = 'Este campo es requerido';
	if (isEmpty(data.details)) errors.details = 'Este campo es requerido';
	if (isEmpty(data.assignee)) errors.asignee = 'Este campo es requerido';

	return {
		errors,
		valid: Object.keys(errors).length == 0 ? true : false,
	};
};
