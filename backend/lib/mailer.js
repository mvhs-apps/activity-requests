
const nodemailer = require('nodemailer');

module.exports = data => {

	let { to, subject, html, cc } = data;

	if (!(to && subject)) {
		throw 'missing_params';
	}
	
	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.GMAIL_USERNAME,
			pass: process.env.GMAIL_PASSWORD
		}
	});

	return transporter.sendMail({
		from: `"MVHS Activity Requests" ${process.env.GMAIL_USERNAME}`,
		to,
		cc,
		subject,
		html
	});
}
