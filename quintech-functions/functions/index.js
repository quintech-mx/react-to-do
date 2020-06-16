const functions = require('firebase-functions');
const app = require('express')();

const {
	getAssignedTasks,
	getOwnTasks,
	createTask,
	getOneTask,
	updateTaskStatus,
	editTask,
	deleteTask,
} = require('./handlers/tasks');

const {
	signup,
	login,
	getAutheticatedUser,
	getUserDetails,
	editUserDetails,
	uploadImage,
} = require('./handlers/users');

const FBAuth = require('./util/fbAuth');

const cors = require('cors');
app.use(cors());

// Task routes
app.get('/my-tasks', FBAuth, getOwnTasks);
app.get('/tasks', FBAuth, getAssignedTasks);
app.post('/task', FBAuth, createTask);
app.get('/task/:taskId', FBAuth, getOneTask);
app.delete('/task/:taskId', FBAuth, deleteTask);
app.post('/task/:taskId/edit', FBAuth, editTask);
app.post('/task/:taskId/update', FBAuth, updateTaskStatus);

// User routes
app.post('/signup', signup);
app.post('/login', login);
app.get('/user', FBAuth, getAutheticatedUser);
app.post('/user', FBAuth, editUserDetails);
app.get('/user/:handle', getUserDetails);
app.post('/user/image', FBAuth, uploadImage);
// app.post('/notifications', FBAuth, markNotificationsRead);

exports.api = functions.region('us-east1').https.onRequest(app);

// exports.createNotificationOnAdd = functions
// 	.region('us-east1')
// 	.firestore.document(`tasks/{id}`)
// 	.onCreate((snapshot) => {
// 		return db
// 			.doc(`/tasks/${snapshot.data().taskId}`)
// 			.get()
// 			.then((doc) => {
// 				if (doc.exists) {
// 					return db.doc(`/notifications/${snapshot.id}`).set({
// 						createdAt: new Date().toISOString(),
// 						recipient: doc.data().assignee,
// 						sender: doc.data().assigner,
// 						type: 'add',
// 						read: false,
// 						taskId: doc.id,
// 					});
// 				}
// 			})
// 			.catch((err) => console.error(err));
// 	});

// exports.deleteNotificationOnTaskDelete = functions
// 	.region('us-east1')
// 	.firestore.document(`tasks/{id}`)
// 	.onDelete((snapshot) => {
// 		return db
// 			.doc(`/notifications/${snapshot.id}`)
// 			.delete()
// 			.catch((err) => console.error(err));
// 	});

// exports.createNotificationOnComplete = functions
// 	.region('us-east1')
// 	.firestore.document(`tasks/{id}`)
// 	.onUpdate((snapshot, context) => {
// 		if (snapshot.data().status === 'Completada') {
// 			return db
// 				.doc(`/tasks/${snapshot.data().taskId}`)
// 				.get()
// 				.then((doc) => {
// 					if (doc.exists) {
// 						return db
// 							.doc(`/users/${context.auth.uid}`)
// 							.get()
// 							.then((dat) => {
// 								if (dat.exists) {
// 									if (
// 										dat.data().handle ===
// 										doc.data().assigner
// 									) {
// 										return db
// 											.doc(
// 												`/notifications/${snapshot.id}`
// 											)
// 											.set({
// 												createdAt: new Date().toISOString(),
// 												recipient: doc.data().assignee,
// 												sender: doc.data().assigner,
// 												type: 'complete',
// 												read: false,
// 												taskId: doc.id,
// 											});
// 									}
// 									return db
// 										.doc(`/notifications/${snapshot.id}`)
// 										.set({
// 											createdAt: new Date().toISOString(),
// 											recipient: doc.data().assigner,
// 											sender: doc.data().assignee,
// 											type: 'complete',
// 											read: false,
// 											taskId: doc.id,
// 										});
// 								}
// 							})
// 							.catch((err) => console.error(err));
// 					}
// 				})
// 				.catch((err) => console.error(err));
// 		}
// 	});
