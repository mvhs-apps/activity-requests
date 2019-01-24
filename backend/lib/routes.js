const firebase = require('firebase');
const crypto = require('crypto');

const fetch = require('node-fetch');
const { URLSearchParams } = require('url');

const router = require('express').Router();
const mailer = require('./mailer');
const emails = require('./emails');

const responses = require('./responses');
const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

if (process.env.NODE_ENV === 'production') {
	firebase.initializeApp(JSON.parse(process.env.FIREBASE_CREDENTIALS))
} else {
	firebase.initializeApp(require('./firebase.json'));
}

function generateId(length) {
	return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

async function getDeptFromPassword(password) {

	let passwords = (await firebase.database().ref('/settings/passwords').once('value')).val();

	for (let dept in passwords) {
		if (passwords.hasOwnProperty(dept) && passwords[dept] === password) {
			return dept;
		}
	}

	return false;
}

async function doesFormExist(id) {
	return (await firebase.database().ref(`/requests/${id}`).once('value')).exists();
}

async function getForm(id) {
	let snapshot = await firebase.database().ref(`/requests/${id}`).once('value');
	return snapshot.val();
}

function sendRequestChangedEmails(id, form) {
	return mailer({
		to: form.general.student_email,
		cc: form.general.advisor_email,
		subject: 'Activity Request Changed',
		html: emails.requestChanged({
			id,
			studentName: form.general.student_name
		})
	});
}

router.get('/get-request/:id', (req, res) => {
	const id = req.params.id;

	firebase.database().ref(`/requests/${id}`).once('value').then(snapshot => {
		if (snapshot.exists()) {
			res.json(responses.success(snapshot.val()));
		} else {
			res.json(responses.error('no_form_exists'));
		}
	});
});

router.post('/submit-request', async (req, res) => {
	let form = req.body.form;
	let id = generateId(40);

	// TODO: idk maybe add some more validation???

	let f = form.general;
	if (!f.student_name || !f.activity_name || !f.club_name || !emailRegEx.test(f.student_email) || !emailRegEx.test(f.advisor_email) || !f.event_description || !f.start_date || !f.all_dates || !req.body.recaptchaToken) {
		return res.json(responses.error('bad_information'));
	}

	// do not remove the following line; very important for security
	form.meta = {
		date_submitted: Date.now(),
		approved: {
			admin: false
		},
		archived: false
	}

	// verify the recaptcha
	let params = new URLSearchParams();
	params.append('secret', process.env.RECAPTCHA_SECRET);
	params.append('response', req.body.recaptchaToken);

	let recaptchaVerification = await (await fetch('https://www.google.com/recaptcha/api/siteverify', {
		method: 'POST',
		body: params
	})).json();

	if (!recaptchaVerification.success) {
		return res.json(responses.error('bad_recaptcha'));
	}

	firebase.database().ref(`/requests/${id}`).set(form, async err => {
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

			await Promise.all( [a, b] );
			res.json(responses.success(id));
		}
	});
});

router.post('/update-password', async (req, res) => {
	let dept = req.body.dept;
	let authPassword = req.body.authPassword;
	let newPassword = req.body.newPassword;

	if ((await getDeptFromPassword(authPassword)) === 'admin') {
		firebase.database().ref(`/settings/passwords/${dept}`).set(newPassword, err => {
			if (err) return res.json(responses.error('error_writing_data'));

			return res.json(responses.success());
		});
	} else
		res.json(responses.error('bad_password'));
});

router.post('/approve/:id', async (req, res) => {
	let id = req.params.id;
	let password = req.body.password;
	let who = req.body.who;
	console.log(who);
	let form = await getForm(id);

	if (!form) {
		return res.json(responses.error('bad_form'));
	}

	let dept = await getDeptFromPassword(password);

	if (dept && await doesFormExist(id)) {
		firebase.database().ref(`/requests/${id}/meta/approved/${dept}`).set({
			approved: true,
			time: Date.now(),
			who
		});

		await sendRequestChangedEmails(id, form);

		return res.json(responses.success());
	}

	res.json(responses.error('bad_password'));
});

router.post('/unapprove/:id', async (req, res) => {
	let id = req.params.id;
	let password = req.body.password;
	let form = await getForm(id);

	if (!form) {
		return res.json(responses.error('bad_form'));
	}

	let dept = await getDeptFromPassword(password);

	if (dept) {
		firebase.database().ref(`/requests/${id}/meta/approved/${dept}`).set(false);

		await sendRequestChangedEmails(id, form);

		return res.json(responses.success());
	}

	res.json(responses.error('bad_password'));
});


router.post('/comment/:id', async (req, res) => {
	let id = req.params.id;
	let who = req.body.who;
	let commentBody = req.body.commentBody;
	let form = await getForm(id);
	
	if (!form || !who || !commentBody) {
		return res.json(responses.error('bad_form'));
	}

	let comments = form.meta.comments || [];
	comments.push({
		time: Date.now(),
		who,
		commentBody
	});

	firebase.database().ref(`/requests/${id}/meta/comments`).set(comments);

	if (req.body.sendEmail)
		await sendRequestChangedEmails(id, form);

	res.json(responses.success());
});

router.post('/archive/:id', async (req, res) => {
	let id = req.params.id;
	let who = req.body.who;
	let form = await getForm(id);

	if (!form || !who) {
		return res.json(responses.error('bad_form'));
	}

	firebase.database().ref(`/requests/${id}/meta/archived`).set({
		time: Date.now(),
		who
	});

	res.json(responses.success());
});

router.post('/unarchive/:id', async (req, res) => {
	let id = req.params.id;
	let form = await getForm(id);

	if (!form) {
		return res.json(responses.error('bad_form'));
	}

	firebase.database().ref(`/requests/${id}/meta/archived`).set(false);

	res.json(responses.success());
});

router.post('/get-all-requests', async (req, res) => {

	if (await getDeptFromPassword(req.body.authPassword)) {
		return res.json(responses.success(
			(await firebase.database().ref('/requests/').once('value')).val()
		));
	}

	res.json(responses.error('bad_password'));

});

router.post('/check-password', async (req, res) => {
	
	let dept = await getDeptFromPassword(req.body.password);

	if (dept) {
		return res.json(responses.success(dept));
	}

	res.json(responses.error('bad_password'));
});

// for heroku, wakes up the server so the user doesn't have to wait later
router.get('/wake-up', (req, res) => {
	res.json(responses.success('waking_up'));
});

module.exports = router;
