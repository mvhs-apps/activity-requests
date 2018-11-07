require('dotenv').config();

const express = require('express');
const cors = require('cors');

const routes = require('./lib/routes');
const responses = require('./lib/responses');

const app = express();

app.use(express.json());

app.options('*', cors());
app.use(cors({
	origin(origin, callback) {
		callback(null, true);
	}
}));

app.use('/api', routes);

app.all('*', (req, res) => {
	res.json(responses.error(404));
});

app.listen(process.env.PORT, () => {
	console.log(`Server started on port ${process.env.PORT}`);
});
