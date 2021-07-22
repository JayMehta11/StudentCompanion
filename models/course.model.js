const mongoose = require('mongoose');

// Course Schema
// course name - String,
// course code - String,
// credits - Number,
// prerequistes - Array,
// course discription - String,
// faculty - String,
// category ids - Array,
// ratings(array) - Array,
// schedule - Array,

const  courseSchema = new mongoose.Schema({
	name: {type: String, required: true},
	code: {type: String, required: true},
	credits: {type: Number, required: true},
	prerequisites: [
		{
			name: {type: String, required: true},
			code: {type: String, required: true}
		}
	],
	courseDescription: {type: String, required: true},
	faculty: {type: String, required: true},
	categoryIds: [{type: String}],
	ratings: [
		{
			studentId: {type: String, required: true},
			rating: {type: Number, required: true},
			comment: {type: String, required: true}
		}
	]
	
});

mongoose.model('course', courseSchema);