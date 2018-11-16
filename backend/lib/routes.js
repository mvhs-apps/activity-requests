const firebase = require('firebase');
const crypto = require('crypto');
const router = require('express').Router();
const mailer = require('./mailer');
const emails = require('./emails');

const responses = require('./responses');

firebase.initializeApp(require('./firebase.json'));

function generateId(length) {
	return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

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

router.post('/submit-request', (req, res) => {
	let form = req.body;
	let id = generateId(40);

	// TODO: idk maybe add some validation???

	// do not remove the following line; very important for security
	req.body.meta = {
		date_submitted: Date.now(),
		approved: {
			asb: false
		}
	}

	firebase.database().ref(`/forms/${id}`).set(form, err => {
		if (err) {
			res.json(responses.error('error_writing_data'));
		} else {

			let a = mailer({
				to: form.general.student_email,
				subject: 'Activity Request Submitted',
				html: emails.newRequestStudent({
					id,
					studentName: form.general.student_name,
					activityName: form.general.activity_name
				})
			});

			let b = mailer({
				to: form.general.advisor_email,
				subject: 'Activity Request Submitted',
				html: emails.newRequestAdvisor({
					id,
					studentName: form.general.student_name,
					clubName: form.general.club_name,
					activityName: form.general.activity_name
				})
			});

			Promise.all( [a, b] ).then(_ => res.json(responses.success(id)) );
			// res.json(responses.success(id));
		}
	});
});

router.post('/update-password', (req, res) => {
	let dept = req.body.dept;
	let authPassword = req.body.authPassword;
	let newPassword = req.body.newPassword;

	firebase.database().ref('/settings/passwords/asb').once('value').then(snapshot => {
		if (snapshot.val() === authPassword) {

			firebase.database().ref(`/settings/passwords/${dept}`).set(newPassword, err => {
				if (err) return res.json(responses.error('error_writing_data'));
				
				return res.json(responses.success());
			});

		} else {
			return res.json(responses.error('bad_password'));
		}
	});
});

router.post('/get-all-requests', (req, res) => {
	let authPassword = req.body.authPassword;

	firebase.database().ref('/settings/passwords/asb').once('value').then(snapshot => {

		if (snapshot.val() === authPassword) {
			firebase.database().ref('/forms/').once('value').then(snapshot => {
				res.json(responses.success(snapshot.val()));
			});
		}
		
	});

});

module.exports = router;
