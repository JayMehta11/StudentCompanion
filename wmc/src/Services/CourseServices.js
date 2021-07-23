async function addCourse(courseDetails){
    return fetch('http://localhost:5000/api/course/add',{
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            courseName: courseDetails.courseName,
            courseCode: courseDetails.courseCode,
            credits: courseDetails.credits,
            prerequisites: courseDetails.prerequisites,
            courseDescription: courseDetails.courseDescription,
            faculty: courseDetails.faculty,
            categoryIds: courseDetails.categoryIds,
            scedule: courseDetails.schedule
        })
    }).then(res => res.json()).catch(err => {
        return {
            status: false,
            message: "Unable to Add Course"
        }
    })
}

export {addCourse}