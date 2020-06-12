const { admin, db } = require('../util/admin');
const config = require('../util/config');

const firebase = require('firebase');
firebase.initializeApp(config);

const { validateSignupData, validateLoginData } = require('../util/validators');

// User sign up
exports.signup = (req, res) => {
	const newUser = {
		email: req.body.email,
		password: req.body.password,
		confirmPassword: req.body.confirmPassword,
		handle: req.body.handle,
		name: req.body.name,
	};

	const { valid, errors } = validateSignupData(newUser);

	if (!valid) return res.status(400).json(errors);

	const noImg = 'no-img.png';

	let token, userId;

	db.doc(`/users/${newUser.handle}`)
		.get()
		.then((doc) => {
			if (doc.exists) {
				return res
					.status(400)
					.json({ handle: 'Este usuario ya existe' });
			}
			return firebase
				.auth()
				.createUserWithEmailAndPassword(
					newUser.email,
					newUser.password
				);
		})
		.then((data) => {
			userId = data.user.uid;
			return data.user.getIdToken();
		})
		.then((idToken) => {
			token = idToken;
			const userCredentials = {
				handle: newUser.handle,
				email: newUser.email,
				name: newUser.name,
				createdAt: new Date().toISOString(),
				imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
				points: 0,
				level: 1,
				admin: false,
				userId,
			};

			return db.doc(`/users/${newUser.handle}`).set(userCredentials);
		})
		.then(() => {
			return res.status(201).json({ token });
		})
		.catch((err) => {
			console.error(err);
			if (err.code === 'auth/email-already-in-use') {
				return res.status(400).json({ email: 'Correo ya registrado' });
			}
			return res.status(500).json({
				general: 'Algo salió mal, por favor inténtalo nuevamente',
			});
		});
};

// User log in
exports.login = (req, res) => {
	const user = {
		email: req.body.email,
		password: req.body.password,
	};

	const { valid, errors } = validateLoginData(user);

	if (!valid) return res.status(400).json(errors);

	firebase
		.auth()
		.signInWithEmailAndPassword(user.email, user.password)
		.then((data) => {
			return data.user.getIdToken();
		})
		.then((token) => {
			return res.json({ token });
		})
		.catch((err) => {
			console.error(err);
			return res.status(403).json({
				general:
					'Usuario/contraseña incorrectos, por favor intente de nuevo',
			});
		});
};

// Get own user details
exports.getAutheticatedUser = (req, res) => {
	let userData = {};

	db.doc(`/users/${req.user.handle}`)
		.get()
		.then((doc) => {
			if (doc.exists) {
				userData.credentials = doc.data();

				return db
					.collection('notifications')
					.where('recipient', '==', req.user.handle)
					.orderBy('createdAt', 'desc')
					.limit(10)
					.get();
			}
		})
		.then((data) => {
			userData.notifications = [];
			data.forEach((doc) => {
				userData.notifications.push({
					recipient: doc.data().recipient,
					sender: doc.data().sender,
					createdAt: doc.data().createdAt,
					taskId: doc.data().screamId,
					type: doc.data().type,
					read: doc.data().read,
					notificationId: doc.id,
				});
			});

			return res.json(userData);
		})
		.catch((err) => {
			console.error(err);
			return res.status(500).json({ error: err.code });
		});
};

// Get any user details
exports.getUserDetails = (req, res) => {
	let userData = {};
	db.doc(`/users/${req.params.handle}`)
		.get()
		.then((doc) => {
			if (doc.exists) {
				userData = doc.data();
				return res.json(userData);
			}
			return res.status(404).json({ error: 'Usuario no encontrado' });
		})
		.catch((err) => {
			console.error(err);
			return res.status(500).json({ error: err.code });
		});
};

// Add points from completed task
exports.completeTask = (userHandle) => {
	db.doc(`/users/${userHandle}`)
		.get()
		.then((data) => {
			let { points } = data.data();
			let level;
			points += 3;

			console.log(
				'Original: ',
				data.data().points,
				' ',
				data.data().level
			);

			switch (true) {
				case points < 6:
					level = 1;
					break;
				case points < 15:
					level = 2;
					break;
				case points < 27:
					level = 3;
					break;
				case points < 42:
					level = 4;
					break;
				case points < 60:
					level = 5;
					break;
			}

			console.log('Nuevo: ', points, ' ', level);

			if (level !== data.data().level) points = 0;

			return data.ref.update({
				points: points,
				level,
			});
		})
		.then(() => {
			return;
		})
		.catch((err) => console.error('Algo salió mal'));
};

// Upload / update profile image
exports.uploadImage = (req, res) => {
	const BusBoy = require('busboy');
	const path = require('path');
	const os = require('os');
	const fs = require('fs');

	const busboy = new BusBoy({ headers: req.headers });

	let imageFileName;
	let imageToBeUploaded = {};

	busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
		if (mimetype !== 'image/png' && mimetype !== 'image/jpeg') {
			return res
				.status(400)
				.json({ error: 'Tipo de archivo incorrecto' });
		}
		const imageExtension = filename.split('.')[
			filename.split('.').length - 1
		];
		imageFileName = `${Math.round(
			Math.random() * 100000
		)}.${imageExtension}`;
		const filepath = path.join(os.tmpdir(), imageFileName);
		imageToBeUploaded = { filepath, mimetype };
		file.pipe(fs.createWriteStream(filepath));
	});

	busboy.on('finish', () => {
		admin
			.storage()
			.bucket()
			.upload(imageToBeUploaded.filepath, {
				resumable: false,
				metadata: {
					metadata: {
						contentType: imageToBeUploaded.mimetype,
					},
				},
			})
			.then(() => {
				const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
				console.log(imageUrl);
				return db.doc(`/users/${req.user.handle}`).update({ imageUrl });
			})
			.then(() => {
				return res.json({ message: 'Imagen actualizada exitosamente' });
			})
			.catch((err) => {
				console.error(err);
				return res.status(500).json({ error: err.code });
			});
	});

	busboy.end(req.rawBody);
};

exports.editUserDetails = (req, res) => {
	let document = db.collection('users').doc(`${req.user.handle}`);
	document
		.update(req.body)
		.then(() => {
			return res.json({ message: 'Usuario actualizado exitosamente' });
		})
		.catch((error) => {
			console.error(error);
			return res.status(500).json({
				error: 'Ocurrió un problema, por favor vuelte a intentarlo',
			});
		});
};

// Mark notifications as read (WIP)
// exports.markNotificationsRead = (req, res) => {
// 	let batch = db.batch();

// 	req.body.forEach((notificationId) => {
// 		const notification = db.doc(`/notifications/${notificationId}`);
// 		batch.update(notification, { read: true });
// 	});

// 	batch
// 		.commit()
// 		.then(() => {
// 			return res.json({ message: 'Notificationes marcadas como leídas' });
// 		})
// 		.catch((err) => {
// 			console.error(err);
// 			return res.status(500).json({ error: err.code });
// 		});
// };
