
const firebase = require('firebase');
const router = require('express').Router();

const responses = require('./responses');

firebase.initializeApp(require('./firebase.json'));

router.get('/get-request/:id', (req, res) => {
	const id = req.params.id;

	firebase.database().ref(`/forms/${id}`).once('value').then(snapshot => {
		if (snapshot.exists()) {
			res.json(responses.success(snapshot.val()));
		} else {
			res.json(responses.error('no_form_exists'));
		}
	});
});

module.exports = router;
