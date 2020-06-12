const { db } = require('../util/admin');
const { validateNewTaskData } = require('../util/validators');

const { completeTask } = require('./users');

exports.getOneTask = (req, res) => {
	db.doc(`/tasks/${req.params.taskId}`)
		.get()
		.then((doc) => {
			if (!doc.exists) {
				return res.status(404).json({ error: 'Tarea no encontrada' });
			}
			if (doc.data().assignee !== req.user.handle) {
				return res.status(403).json({ error: 'No autorizado' });
			}
			taskData = doc.data();
			taskData.taskId = doc.id;
			return res.json(taskData);
		})
		.catch((err) => {
			console.error(err);
			return res.status(500).json({ error: err.code });
		});
};

// Fetch assigned tasks
exports.getAssignedTasks = (req, res) => {
	db.collection('tasks')
		.orderBy('completed')
		.orderBy('createdAt', 'desc')
		.get()
		.then((data) => {
			let tasks = [];
			data.forEach((doc) => {
				if (doc.data().assigner === req.user.handle) {
					tasks.push({
						taskId: doc.id,
						name: doc.data().name,
						details: doc.data().details,
						status: doc.data().status,
						assignee: doc.data().assignee,
						createdAt: doc.data().createdAt,
						completed: doc.data().completed,
					});
				}
			});
			return res.json(tasks);
		})
		.catch((err) => console.error(err));
};

// Fetch own tasks
exports.getOwnTasks = (req, res) => {
	db.collection('tasks')
		.orderBy('completed')
		.orderBy('createdAt', 'desc')
		.get()
		.then((data) => {
			let tasks = [];
			data.forEach((doc) => {
				if (doc.data().assignee === req.user.handle) {
					tasks.push({
						taskId: doc.id,
						name: doc.data().name,
						details: doc.data().details,
						status: doc.data().status,
						assigner: doc.data().assigner,
						createdAt: doc.data().createdAt,
						completed: doc.data().completed,
					});
				}
			});
			return res.json(tasks);
		})
		.catch((err) => console.error(err));
};

// Create task
exports.createTask = (req, res) => {
	const newTask = {
		name: req.body.name,
		details: req.body.details,
		assignee: req.body.assignee,
		assigner: req.user.handle,
		createdAt: new Date().toISOString(),
		status: 'No se ha empezado',
		completed: false,
	};

	const { valid, errors } = validateNewTaskData(newTask);

	if (!valid) return res.status(400).json(errors);

	db.collection('tasks')
		.add(newTask)
		.then((doc) => {
			const resTask = newTask;
			resTask.taskId = doc.id;
			res.json(resTask);
		})
		.catch((err) => {
			res.status(500).json({ error: 'Algo salió mal' });
			console.error(err);
		});
};

// Update Task Status
exports.updateTaskStatus = (req, res) => {
	const newStatus = {
		taskId: req.params.taskId,
		status: req.body.status,
	};

	const user = req.user.handle;

	db.doc(`/tasks/${req.params.taskId}`)
		.get()
		.then((doc) => {
			if (!doc.exists) {
				return res.status(404).json({ error: 'Tarea no encontrada' });
			}

			const taskData = doc.data();

			if (newStatus.status === taskData.status) {
				return res.status(400).json({
					error:
						'No fue posible realizar el cambio de estado. Mismo estado detectado',
				});
			}

			if (user !== taskData.assignee && user !== taskData.assigner) {
				return res.status(403).json({ error: 'No autorizado' });
			}

			if (newStatus.status === 'Completada') {
				completeTask(taskData.assignee);
				return doc.ref.update({
					status: newStatus.status,
					completed: true,
				});
			}

			return doc.ref.update({
				status: newStatus.status,
			});
		})
		.then(() => {
			return res.status(200).json(newStatus);
		})
		.catch((err) => {
			console.error(err);
			return res.status(500).json({ error: 'Algo salió mal' });
		});
};

// Edit Task
exports.editTask = (req, res) => {
	const newTaskData = {
		name: req.body.name,
		details: req.body.details,
		assignee: req.body.assignee,
	};
	const { valid, errors } = validateNewTaskData(newTaskData);

	if (!valid) return res.status(400).json(errors);

	let document = db.doc(`/tasks/${req.params.taskId}`);

	document
		.update(newTaskData)
		.then(() => {
			res.status(200).json(newTaskData);
		})
		.catch((err) => {
			console.error(err);
			return res.status(500).json({ error: 'Algo salió mal' });
		});
};

// Delete task
exports.deleteTask = (req, res) => {
	const document = db.doc(`/tasks/${req.params.taskId}`);

	document
		.get()
		.then((doc) => {
			if (!doc.exists) {
				return res.status(404).json({ error: 'Tarea no encontrada' });
			}
			if (doc.data().assigner !== req.user.handle) {
				return res.status(403).json({ error: 'No autorizado' });
			}

			return document.delete();
		})
		.then(() => {
			res.json({ message: 'Tarea eliminada exitosamente' });
		})
		.catch((err) => {
			console.error(err);
			return res.status(500).json({ error: err.code });
		});
};
