const { admin, db } = require('./admin');

module.exports = (req, res, next) => {
	let idToken;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Token ')
	) {
		idToken = req.headers.authorization.split('Token ')[1];
	} else {
		console.error('No se encontró ningún token');
		return res.status(403).json({ error: 'No autorizado' });
	}

	admin
		.auth()
		.verifyIdToken(idToken)
		.then((decodedToken) => {
			req.user = decodedToken;
			return db
				.collection('users')
				.where('userId', '==', req.user.uid)
				.get();
		})
		.then((data) => {
			req.user.handle = data.docs[0].data().handle;
			return next();
		})
		.catch((err) => {
			console.error('Error al verificar token token', err);
			return res.status(403).json(err);
		});
};
