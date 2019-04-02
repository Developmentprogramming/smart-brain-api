const clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '328d9985df2b4fb196e235145d6d8766'
});

const handleApiCall = (req, res) => {
	app.models.predict("a403429f2ddf4b49b307e318f00e528b", [req.body.input])
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json('unable to work with api'))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0])
	})
	.catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImage,
	handleApiCall
}