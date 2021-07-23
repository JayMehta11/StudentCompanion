import { Fab, IconButton, Button, TextField } from '@material-ui/core'
import { AccessAlarmOutlined, Add, AddOutlined, ArrowForward, ArrowForwardIosOutlined, AssignmentTurnedInOutlined, DeleteOutlined, EditOutlined, ExpandLessOutlined, ExpandMoreOutlined, Filter, NavigateNextOutlined, RemoveOutlined, SentimentDissatisfiedOutlined } from '@material-ui/icons'
import React, { useContext, useEffect, useRef, useState } from 'react'
// import { deleteTodos, getTodos, updateTodos } from '../../Services/TodoServices';
import {toast} from 'react-toastify'
import './course.scss'
import PulseLoader from 'react-spinners/PulseLoader'
import Operation from './Operation';
import * as moment from 'moment'
import { GlobalLoadingContext } from '../../Context/GlobalLoadingContext';
import ConfirmDialog from '../ConfirmDialog';
import { addRating, deleteCourse, getCourse } from '../../Services/CourseServices'
import { currentUser } from '../../Services/AuthServices'
import Rating from '../Rating'

export default function Courses() {

    const [courses,setcourses] = useState("loading");
    const [loading,setLoading] = useState(false);
    // const [filter,setFilter] = useState("All");
    const [openOperationDialog,setOpenOperationDialog] = useState(false);
    const [courseDescriptionOpen,setCourseDescriptionOpen] = useState(-1);
    const [courseRatingOpen,setCourseRatingOpen] = useState(-1);
    const [courseUpdateDetails,setCourseUpdateDetails] = useState(false);
    const {setGlobalLoading} = useContext(GlobalLoadingContext)
    const [rating,setRating] = useState(1);
    const [ConfirmDeleteDialog,setConfirmDeleteDialog] = useState({
        open: false,
        idx: false
    });
    const [user,setUser] = useState(currentUser.value)
    const ratingRef = useRef("")
    
    
    

    let Days = [
        "Mon","Tue","Wed","Thu","Fri","Sat","Sun"
    ]

    let CloseDialog = () => {
        setOpenOperationDialog(false);
        setCourseUpdateDetails(false);
    }
    let CloseConfirmDeleteDialog = () => {
        setConfirmDeleteDialog({
            open: false,
            idx: false
        })
    }

    let getTableScaling = () => {
        let course = document.querySelectorAll(".course-details");
        let coursesContainer = document.querySelector(".course-container");
        let mainContainer = document.querySelector("#main-container")
        if(course !== undefined && coursesContainer!==undefined && course.length > 0){
            if(mainContainer.offsetWidth < course[0].offsetWidth){
                for(let i=0;i<course.length;i++){
                    course[i].style.transform = `scaleX(${(mainContainer.offsetWidth / course[i].offsetWidth) - 0.003})`
                    course[i].style.transformOrigin = "center 0%";
                    // course[i].style.marginBottom = "-1rem";
                    // coursesContainer.style.rowGap = "0rem 0rem"
                }
            }
            else{
                for(let i=0;i<course.length;i++){
                    course[i].style.transform = `scale(1)`
                    course[i].style.transformOrigin = "0% 0%"
                    coursesContainer.style.rowGap = "0rem 0.8rem"
                }
            }
            
        }
        
    }
    console.log(courses)
    let FetchCourses = async () => {
        setLoading(true);
        try{
            
            let CourseResponse = await getCourse();
            setLoading(false);
            if(CourseResponse.status){
                setcourses(CourseResponse.courses)
            }else{
                setcourses([])
                toast.error("Unable to get Todos") 
            }
        }catch(err){
            setLoading(false);
            toast.error("Unable to get Todos")
        }
        
        
    }

    

    let UpdateCourseItem = (course) => {
        let updatedList = courses.map(item => 
            {
              if (item._id == course._id){
                return course; //gets everything that was already in item, and updates "done"
              }
              return item; // else return unmodified item 
            }); 
            
        setcourses(updatedList);    
    }

    let DeleteCourse =async (idx) => {
        CloseConfirmDeleteDialog()
        setGlobalLoading(true);

        try{
            let DeleteCourseResponse = await deleteCourse(idx);
            
            if(DeleteCourseResponse.status){
                toast.success(DeleteCourseResponse.message)
                await FetchCourses()
                setCourseDescriptionOpen(-1)
                setGlobalLoading(false)
            }else{
                toast.error(DeleteCourseResponse.message)
                setGlobalLoading(false)
            }
        }catch(err){
            setGlobalLoading(false)
            toast.error("Unable to Delete Course")
        }

    }

    let updateRating = (idx,comment,rate) => {
        let updatedList = []
        courses.map(course => {
            
            if(course._id === idx){
               let temp = course;
                temp.ratings.push({
                    rating: rate,
                    comment: comment
                })
                updatedList.push(temp);
            }else{
                updatedList.push(course);
            }
        })
        setcourses(updatedList)
    }

    let AddRating = async (idx) => {
        setGlobalLoading(true);

        try{
            let AddRatingResponse = await addRating(idx,ratingRef.current.value,rating);
            
            if(AddRatingResponse.status){
                toast.success(AddRatingResponse.message)
                updateRating(idx,ratingRef.current.value,rating);
                ratingRef.current.value = "";
                setRating(1)
                setGlobalLoading(false)
            }else{
                toast.error(AddRatingResponse.message)
                setGlobalLoading(false)
            }
        }catch(err){
            console.log(err)
            setGlobalLoading(false)
            toast.error("Unable to Add Rating")
        }
    }

    const ChangeRating = (newRating) => {
        setRating(parseInt(newRating))
      };
    
      useEffect(() => {
        let AuthObservalble = currentUser.subscribe(data => setUser(data))
    
        return () => {
          AuthObservalble.unsubscribe();
        }
      },[])
    useEffect(() => {
        FetchCourses();
    },[])

    useEffect(() => {
        getTableScaling();

        window.addEventListener('resize',getTableScaling)

        return () => {
            window.removeEventListener('resize',getTableScaling)
        }
    },[courses])

    // let getDate = (seconds) => {
    //     return moment(new Date(seconds * 1000)).format('DD-MM-YYYY')
    // }
    return (
        <>
            <div className="w-100 mt-4 px-lg-5 px-md-4 px-1 d-flex justify-content-between align-items-center">
                <Button variant="contained" onClick={() => setOpenOperationDialog(true)} startIcon={<AddOutlined />} color="primary">Add Course</Button>
                {/* <TextField 
                    select 
                    SelectProps={{
                        native: true
                    }}
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="All">All</option>
                    <option value={true}>Completed</option>
                    <option value={false}>Pending</option>
                </TextField> */}
            </div>
            {courses==="loading" || loading ? <div className="w-100 mt-4 text-center"><PulseLoader size={15} margin={2} color="#36D7B7" /></div> : 
            <>
            {courses.length===0 ? <h4 className={`text-center mt-5 no-data-found`}>No Data Found <SentimentDissatisfiedOutlined /></h4> :
            <div className="w-100 my-4 d-flex flex-column justify-content-between align-items-center course-container px-lg-5 px-md-4 px-1 mx-auto">
                <div className="w-100 d-flex  align-items-center py-0 header">
                    {/* <span><Fab className={"col-1 fab-button " + (course.done ? "completed" :"not_completed")} ><AssignmentTurnedInOutlined className={(course.done ? "completed" :"not_completed")} /></Fab></span> */}
                    <span className="col-1 text-center">{"#"}</span>
                    <span className="col-2 text-center">{"Code"}</span>
                    <span className="col-3 text-center" style={{textAlign: "right"}}>{"Name"}</span>
                    <span className="col-2 text-center">{"Credits"}</span>
                    <span className="col-3 text-center" >{"School"}</span>
                    <span className="col-1 text-center"></span>
                </div>
               {courses.map((course,i) => 
                    <span key={course._id} className="w-100 course-details">
                        <div className="w-100 d-flex  align-items-center course py-0">
                            {/* <span><Fab className={"col-1 fab-button " + (course.done ? "completed" :"not_completed")} ><AssignmentTurnedInOutlined className={(course.done ? "completed" :"not_completed")} /></Fab></span> */}
                            <span className="col-1 text-center">{i+1}</span>
                            <span className="col-2 text-center">{course.courseCode}</span>
                            <span className="col-3 text-center">{course.courseName}</span>
                            <span className="col-2 text-center completed" style={{backgroundColor:"white"}}><li>{course.credits}</li></span>
                            <span className="col-3 text-center" >{course.school?.toUpperCase()}</span>
                            <span className="col-1 text-center">{courseDescriptionOpen!==i ? <NavigateNextOutlined onClick={()=> setCourseDescriptionOpen(i)} style={{color: "lightgrey",cursor: 'pointer'}} /> : <ExpandLessOutlined onClick={()=> setCourseDescriptionOpen(-1)} style={{color: "lightgrey",cursor: 'pointer'}} />}</span>
                        </div>
                        {courseDescriptionOpen===i && <div className="w-100 mt-4 ps-3 mb-3 course-description">

                            {user.isAdmin && <div className="mt-3 mb-3 d-flex justify-content-end align-items-center flex-wrap me-3">
                                <Button variant="outlined" 
                                onClick={async () => {
                                    await setCourseUpdateDetails(course);
                                    setOpenOperationDialog(true);
                                }} 
                                startIcon={<EditOutlined />}>Edit</Button>
                                <Button variant="contained" 
                                onClick={() => {setConfirmDeleteDialog({
                                    open: true,
                                    idx: course._id
                                })}} 
                                startIcon={<DeleteOutlined />} className="delete-btn">Delete</Button>
                            </div>}

                            <h5>Description:</h5>
                            <p className="px-3">{course.courseDescription}</p>
                            <h5 className="mt-2">Prerequisites:</h5>
                            <p className="px-3">{course.prerequisites.map((pre,i) => 
                                `${pre}${i!==course.prerequisites.length-1 ? ",": ""}`
                            )}</p>
                            <h5>Faculty:</h5>
                            <p className="px-3">{course.faculty}</p>
                            <h5 className="mt-2">Category:</h5>
                            <p className="px-3">{course.categoryIds.map((pre,i) => 
                                `${pre}${i!==course.categoryIds.length-1 ? ",": ""}`
                            )}</p>
                            <h5 className="mt-2">Schedule:</h5>
                            <p className="px-3 d-flex flex-column">{course.schedule.map((pre,i) => 
                                <p>{`${Days[pre.day]}  ${pre.time}`}</p>
                            )}</p>
                            <h5 className="mt-2">Ratings:</h5>
                            {courseRatingOpen!==i ? <Button color="primary" onClick={() => setCourseRatingOpen(i)} startIcon={<Add />}>Show Ratings</Button> : <Button color="primary" onClick={() => setCourseRatingOpen(-1)} startIcon={<RemoveOutlined />}>Hide Ratings</Button>}

                            {courseRatingOpen===i && <div className="mt-3 d-flex flex-column rating-container">
                                {course.ratings.map((rate,k) => 
                                    <span key={k} className="ms-3 d-flex flex-column"><Rating readonly={true} value={rate.rating} /> {rate.comment}</span>
                                )}
                                    
                            </div>}
                            <div className="w-100 d-flex align-items-end">
                                <TextField 
                                    label="Comment"
                                    inputRef={ratingRef}
                                />
                                <Rating 
                                    value={rating}
                                    setRating={(rate) => ChangeRating(rate)}
                                />
                                <Button variant="contained" color="secondary" onClick={() => AddRating(course._id)}>Add Rating</Button>
                            </div>
                                

                        </div>}
                    </span>
               )} 
            </div>
            }</>
            }
            <Operation open={openOperationDialog} FetchCourses={FetchCourses} updateCourse={UpdateCourseItem} course={courseUpdateDetails} close={CloseDialog} />
            <ConfirmDialog open={ConfirmDeleteDialog.open} item={"Course"} close={CloseConfirmDeleteDialog} action={() => DeleteCourse(ConfirmDeleteDialog.idx)} />
        </>
    )
}
