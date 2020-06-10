const admin = require('firebase-admin');
const serviceAccount = require('../key/serviceAccountKey.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://quintech-pr.firebaseio.com',
	storageBucket: 'quintech-pr.appspot.com',
});

const db = admin.firestore();

module.exports = { admin, db };
