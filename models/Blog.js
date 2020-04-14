const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	markdown: {
		type: String,
		required: true
	},
	created: {
		type: Date,
		default: new Date()
	}
});

module.exports = mongoose.model('Blog', blogSchema);
