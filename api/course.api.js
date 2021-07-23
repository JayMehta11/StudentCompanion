// Course Schema
// name: {type: String, required: true},
// code: {type: String, required: true},
// credits: {type: Number, required: true},
// prerequisites: [
// 	{
// 		name: {type: String, required: true},
// 		code: {type: String, required: true}
// 	}
// ],
// courseDescription: {type: String, required: true},
// faculty: {type: String, required: true},
// categoryIds: [{type: String}],
// ratings: [
// 	{
// 		studentId: {type: String, required: true},
// 		rating: {type: Number, required: true},
// 		comment: {type: String, required: true}
// 	}
// ]

const jwt = require('jsonwebtoken');
const app = require('express').Router();
const mongoose = require('mongoose');
const Course = mongoose.model('course');
const CourseEnrollment = mongoose.model('courseEnrollment');

app.post('/add', (req, res) => {
	const course = new Course({
		courseName: req.body.courseName,
		courseCode: req.body.courseCode,
		credits: req.body.credits,
		prerequisites: req.body.prerequisites,
		courseDescription: req.body.courseDescription,
		faculty: req.body.faculty,
		categoryIds: req.body.categoryIds,
		scedule: req.body.schedule
	});
	course.save(err => {
		if (err) {
			res.json({
				status: false,
				message: err
			});
		} else {
			res.json({
				status: true,
				message: 'Course added successfully'
			});
		}
	});
});

app.post('/update', (req, res) => {
	const course = req.body;
	Course.findOneAndUpdate({
		_id: course._id
	}, {
		$set: {
			name: course.name,
			code: course.code,
			credits: course.credits,
			prerequisites: course.prerequisites,
			courseDescription: course.courseDescription,
			faculty: course.faculty,
			categoryIds: course.categoryIds
		}
	}, (err, course) => {
		if (err) {
			res.json({
				status: false,
				message: err
			});
		} else {
			res.json({
				status: true,
				message: 'Course updated successfully'
			});
		}
	});
});

app.post('/delete', (req, res) => {
	Course.findOneAndRemove({
		_id: req.body._id
	}, (err, course) => {
		if (err) {
			res.json({
				status: false,
				message: err
			});
		} else {
			res.json({
				status: true,
				message: 'Course deleted successfully'
			});
		}
	});
});



// student: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
// course: { type: mongoose.Schema.Types.ObjectId, ref: 'course' },
// semester: { type: String, default: 'Spring' },
// year: { type: Number, default: 2017 },
// created: { type: Date, default: Date.now }

// Course Enrollment Schema
// Need to enroll students for courses
// Should be able to enroll for multiple courses
// Should contain semesters and year information

app.post('/enrollInCourse', (req, res) => {
	const student = req.body.student;
	const course = req.body.course;
	const semester = req.body.semester;
	const year = req.body.year;
	const created = req.body.created;
	const enrollment = new CourseEnrollment({
		student: student,
		course: course,
		semester: semester,
		year: year,
		created: created
	});
	enrollment.save(err => {
		if (err) {
			res.json({
				status: false,
				message: err
			});
		} else {
			res.json({
				status: true,
				message: 'Course Enrollment added successfully'
			});
		}
	});
});

app.post('/deleteEnrollment', (req, res) => {
	CourseEnrollment.findOneAndRemove({
		_id: req.body._id
	}, (err, enrollment) => {
		if (err) {
			res.json({
				status: false,
				message: err
			});
		} else {
			res.json({
				status: true,
				message: 'Course Enrollment deleted successfully'
			});
		}
	});
});

// Get all course enrollments for semester and student
// use mongodb aggregation to get all courses for a given semester

app.post('/enrolledIn', (req, res) => {
	const semester = req.body.semester;
	const year = req.body.year;
	const student = req.body.student;
	CourseEnrollment.aggregate([
		{$match: {
			semester: semester,
			year: year,
			student: student
		}},
		{$lookup: {
			from: 'course',
			localField: 'course',
			foreignField: '_id',
			as: 'course'
		}},
		{$sort: {
			created: -1
		}}
	], (err, enrollments) => {
		if (err) {
			res.json({
				status: false,
				message: err
			});
		} else {
			res.json({
				status: true,
				message: 'Course Enrollments retrieved successfully',
				enrollments: enrollments
			});
		}
	}
	);
});

module.exports = app