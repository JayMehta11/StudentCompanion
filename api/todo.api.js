// Todo Schema
// student_id: {
// 	type: String,
// 	required: true
// },
// task: {
// 	type: String,
// 	required: true
// },
// done: {
// 	type: Boolean,
// 	default: false,
// 	required: true
// },
// description: {
// 	type: String
// },
// created_at: {
// 	type: Date,
// 	default: Date.now
// }

const jwt = require('jsonwebtoken');
const app = require('express').Router();
const mongoose = require('mongoose');
const Todo = mongoose.model('todo');

app.post('/add', (req, res) => {
	var decoded = jwt.verify(req.headers.authorization, '12345');
	const todo = new Todo({
		student_id: decoded.id,
		task: req.body.task,
		description: req.body.description
	});
	todo.save((err, todo) => {
		if (err) {
			res.json({
				status: false,
				message: err
			});
		} else {
			res.json({
				status: true,
				message: 'Todo Added Successfully'
			});
		}
	});
});

app.post('/update', (req, res) => {
	Todo.findOneAndUpdate({
		_id: req.body._id
	}, {
		$set: {
			task: req.body.task,
			description: req.body.description,
			done: req.body.done
		}
	}, (err, todo) => {
		if (err) {
			res.json({
				status: false,
				message: err
			});
		} else {
			res.json({
				status: true,
				message: 'Todo Updated Successfully'
			});
		}
	});
});

// Delete Todo POST API

app.post('/delete', (req, res) => {
	Todo.findOneAndRemove({
		_id: req.body._id
	}, (err, todo) => {
		if (err) {
			res.json({
				status: false,
				message: err
			});
		} else {
			res.json({
				status: true,
				message: 'Todo Deleted Successfully'
			});
		}
	});
});

// Get All Todo POST API of a student
// Fetch student Id from Token


app.post('/get', (req, res) => {
	const decoded = jwt.verify(req.headers.authorization, '12345');
	Todo.find({
		student_id: decoded.id
	}, (err, todos) => {
		if (err) {
			res.json({
				status: false,
				message: err
			});
		} else {
			res.json({
				status: true,
				message: 'Todos Fetched Successfully',
				todos
			});
		}
	});
});

module.exports = app;