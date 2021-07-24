import { Fab, IconButton, Button, TextField, Checkbox } from '@material-ui/core'
import { AccessAlarmOutlined, Add, AddOutlined, ArrowForward, ArrowForwardIosOutlined, AssignmentTurnedInOutlined, DeleteOutlined, EditOutlined, ExpandLessOutlined, ExpandMoreOutlined, Filter, FirstPageOutlined, LastPageOutlined, NavigateBeforeOutlined, NavigateNextOutlined, RemoveOutlined, SentimentDissatisfiedOutlined } from '@material-ui/icons'
import React, { useContext, useEffect, useRef, useState } from 'react'
// import { deleteTodos, getTodos, updateTodos } from '../../Services/TodoServices';
import {toast} from 'react-toastify'
import './student.scss'
import PulseLoader from 'react-spinners/PulseLoader'
import Operation from './Operation';
import * as moment from 'moment'
import { GlobalLoadingContext } from '../../Context/GlobalLoadingContext';
import ConfirmDialog from '../ConfirmDialog';
// import { addRating, deleteCourse, getCourse } from '../../Services/CourseServices'
import { currentUser } from '../../Services/AuthServices'
import { getUsers } from '../../Services/UserServices'
import { getCourse } from '../../Services/CourseServices'
// import Rating from '../Rating'

export default function StudentEnroll() {

    const [students,setStudents] = useState("loading");
    const [loading,setLoading] = useState(false);
    // const [filter,setFilter] = useState("All");
    const [openOperationDialog,setOpenOperationDialog] = useState(false);
    // const [courseDescriptionOpen,setCourseDescriptionOpen] = useState(-1);
    // const [courseRatingOpen,setCourseRatingOpen] = useState(-1);
    // const [courseUpdateDetails,setCourseUpdateDetails] = useState(false);
    const {setGlobalLoading} = useContext(GlobalLoadingContext);
    const selectAllResf = useRef("");
    const selectRef = useRef([]);
    // const [rating,setRating] = useState(1);
    // const [ConfirmDeleteDialog,setConfirmDeleteDialog] = useState({
    //     open: false,
    //     idx: false
    // });
    const [user,setUser] = useState(currentUser.value)
    // const ratingRef = useRef("")
    const [page,setPage] = useState(0);
    const [dataToShow,setDataToShow] = useState([]);
    const [selectState,setSelectState] = useState(selectRef);
    const [courses,setcourses] = useState([]);
    

    let Days = [
        "Mon","Tue","Wed","Thu","Fri","Sat","Sun"
    ]

    let CloseDialog = () => {
        setOpenOperationDialog(false);
    }
    // let CloseConfirmDeleteDialog = () => {
    //     setConfirmDeleteDialog({
    //         open: false,
    //         idx: false
    //     })
    // }

    let getTableScaling = () => {
        let student = document.querySelectorAll(".student-details");
        let studentsContainer = document.querySelector(".student-container");
        let mainContainer = document.querySelector("#main-container")
        if(student !== undefined && studentsContainer!==undefined && student.length > 0){
            if(mainContainer.offsetWidth < student[0].offsetWidth){
                for(let i=0;i<student.length;i++){
                    student[i].style.transform = `scaleX(${(mainContainer.offsetWidth / student[i].offsetWidth) - 0.003})`
                    student[i].style.transformOrigin = "center 0%";
                    // student[i].style.marginBottom = "-1rem";
                    // studentsContainer.style.rowGap = "0rem 0rem"
                }
            }
            else{
                for(let i=0;i<student.length;i++){
                    student[i].style.transform = `scale(1)`
                    student[i].style.transformOrigin = "0% 0%"
                    studentsContainer.style.rowGap = "0rem 0.8rem"
                }
            }
            
        }
        
    }
    console.log(students)
    let FetchCourses = async () => {
            getCourse().then(CourseResponse => {
                if(CourseResponse.status){
                    setcourses(CourseResponse.courses)
                }else{
                    setcourses([])
                    toast.error("Unable to get Courses") 
                }
            }).catch(err => {
                toast.error("Unable to get Courses")
            })
        
        
    }
    let FetchStudents = async () => {
        setLoading(true);
        try{
            
            let StudentResponse = await getUsers();
            setLoading(false);
            if(StudentResponse.status){
                setStudents(StudentResponse.students)
                let data = [];
                for(let i=0;i<StudentResponse.students.length;i++){
                    let student = StudentResponse.students[i];
                    data.push(
                        <span key={student._id} className="w-100 student-details">
                            <div className="w-100 d-flex  align-items-center student py-0">
                                <span className="col-1 text-center">{<input type="checkbox" color="primary" ref={el => selectRef.current[i]=el} />}</span>
                                <span className="col-3 text-center">{student.enrollmentNumber}</span>
                                <span className="col-3 text-center">{student.firstName}</span>
                                <span className="col-3 text-center" >{student.emailId}</span>
                                <span className="col-2 text-center" >{student.programme}</span>
                            </div>
                        </span>
                    )
                }
                setDataToShow(data);
            }else{
                setStudents([])
                toast.error("Unable to get Students") 
            }
        }catch(err){
            setLoading(false);
            toast.error("Unable to get Students")
        }
        
        
    }

    

    // let UpdatestudentItem = (course) => {
    //     let updatedList = courses.map(item => 
    //         {
    //           if (item._id == course._id){
    //             return course; //gets everything that was already in item, and updates "done"
    //           }
    //           return item; // else return unmodified item 
    //         }); 
            
    //     setcourses(updatedList);    
    // }

    // let DeleteCourse =async (idx) => {
    //     CloseConfirmDeleteDialog()
    //     setGlobalLoading(true);

    //     try{
    //         let DeleteCourseResponse = await deleteCourse(idx);
            
    //         if(DeleteCourseResponse.status){
    //             toast.success(DeleteCourseResponse.message)
    //             await FetchCourses()
    //             setCourseDescriptionOpen(-1)
    //             setGlobalLoading(false)
    //         }else{
    //             toast.error(DeleteCourseResponse.message)
    //             setGlobalLoading(false)
    //         }
    //     }catch(err){
    //         setGlobalLoading(false)
    //         toast.error("Unable to Delete Course")
    //     }

    // }

    // let updateRating = (idx,comment,rate) => {
    //     let updatedList = []
    //     courses.map(course => {
            
    //         if(course._id === idx){
    //            let temp = course;
    //             temp.ratings.push({
    //                 rating: rate,
    //                 comment: comment
    //             })
    //             updatedList.push(temp);
    //         }else{
    //             updatedList.push(course);
    //         }
    //     })
    //     setcourses(updatedList)
    // }

    // let AddRating = async (idx) => {
    //     setGlobalLoading(true);

    //     try{
    //         let AddRatingResponse = await addRating(idx,ratingRef.current.value,rating);
            
    //         if(AddRatingResponse.status){
    //             toast.success(AddRatingResponse.message)
    //             updateRating(idx,ratingRef.current.value,rating);
    //             ratingRef.current.value = "";
    //             setRating(1)
    //             setGlobalLoading(false)
    //         }else{
    //             toast.error(AddRatingResponse.message)
    //             setGlobalLoading(false)
    //         }
    //     }catch(err){
    //         console.log(err)
    //         setGlobalLoading(false)
    //         toast.error("Unable to Add Rating")
    //     }
    // }

    // const ChangeRating = (newRating) => {
    //     setRating(parseInt(newRating))
    //   };
    // let getRating = (course) => {
    //     let rate = 0;
    //     course.ratings.map((r,i) => {
    //         rate += r.rating;
    //     })
    //     rate = (rate / course.ratings.length)
    //     if(rate===0){
    //         rate=1;
    //     }
    //     return rate.toFixed(1)
    // }
      useEffect(() => {
        let AuthObservalble = currentUser.subscribe(data => setUser(data))
    
        return () => {
          AuthObservalble.unsubscribe();
        }
      },[])
    useEffect(() => {
        FetchCourses();
        FetchStudents();
    },[])

    useEffect(() => {
        getTableScaling();

        window.addEventListener('resize',getTableScaling)

        return () => {
            window.removeEventListener('resize',getTableScaling)
        }
    },[students])

    
    return (
        <>
            <div className="w-100 mt-4 px-lg-5 px-md-4 px-1 d-flex justify-content-between align-items-center">
                <Button variant="contained" 
                // onClick={() => setOpenOperationDialog(true)}
                 startIcon={<AddOutlined />} color="primary">Add Student</Button>
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
            {students==="loading" || loading ? <div className="w-100 mt-4 text-center"><PulseLoader size={15} margin={2} color="#36D7B7" /></div> : 
            <>
            {students.length===0 ? <h4 className={`text-center mt-5 no-data-found`}>No Data Found <SentimentDissatisfiedOutlined /></h4> :
            <div className="w-100 my-4 d-flex flex-column justify-content-between align-items-center student-container px-lg-5 px-md-4 px-1 mx-auto">
                <div className="w-100 d-flex  align-items-center py-0 header">
                    {/* <span><Fab className={"col-1 fab-button " + (course.done ? "completed" :"not_completed")} ><AssignmentTurnedInOutlined className={(course.done ? "completed" :"not_completed")} /></Fab></span> */}
                    <span className="col-1 text-center"><input ref={selectAllResf} type="checkbox" onChange={(e) => {
                            
                            for(let i=0;i<selectRef.current.length;i++){
                                selectRef.current[i].checked = selectAllResf.current.checked;
                            }
                        }
                    } style={{color: '#0d6efd'}} /></span>
                    <span className="col-3 text-center">{"Id"}</span>
                    <span className="col-3 text-center" style={{textAlign: "right"}}>{"Name"}</span>
                    <span className="col-3 text-center">{"Email-id"}</span>
                    <span className="col-2 text-center">{"Programme"}</span>
                </div>
               {dataToShow.slice((10*page),Math.min(10*(page+1),students.length)).map((student,i) => 
                        // <span key={student._id} className="w-100 student-details">
                        //     <div className="w-100 d-flex  align-items-center student py-0">
                        //         <span className="col-1 text-center">{<Checkbox />}</span>
                        //         <span className="col-3 text-center">{student.enrollmentNumber}</span>
                        //         <span className="col-3 text-center">{student.firstName}</span>
                        //         <span className="col-3 text-center" >{student.emailId}</span>
                        //         <span className="col-2 text-center" >{student.programme}</span>
                        //     </div>
                        // </span>
                        student
                    )}

                <div className="w-100 d-flex justify-content-between align-items-center py-0 mx-2">
                    <Button variant="contained" onClick={async () => {
                        await setSelectState(selectRef)
                        setOpenOperationDialog(true)
                        }} color="secondary">Action</Button>

                    <div className="d-flex align-items-center"><IconButton size="small" disabled={page===0} onClick={() => setPage(0)}><FirstPageOutlined /></IconButton>
                    <IconButton size="small" disabled={page===0} onClick={() => setPage(prev => prev - 1)}><NavigateBeforeOutlined /></IconButton>
                    <IconButton size="small" disabled={page===(Math.ceil((students.length)/10) - 1)} onClick={() => setPage(prev => prev + 1)}><NavigateNextOutlined /></IconButton>
                    <IconButton className="me-2" size="small" disabled={page===(Math.ceil((students.length)/10) - 1)} onClick={() => setPage((Math.ceil((students.length)/10) - 1))}><LastPageOutlined /></IconButton>
                    {`${page+1} of ${Math.ceil((students.length)/10)} page`}
                    </div>
                </div>

                {/* <div></div> */}
            </div>
            
            }
            
            </>
            }
            {openOperationDialog && <Operation open={openOperationDialog} students={students} courses={courses} select={selectState} close={CloseDialog} />}
            {/* <ConfirmDialog open={ConfirmDeleteDialog.open} item={"Course"} close={CloseConfirmDeleteDialog} action={() => DeleteCourse(ConfirmDeleteDialog.idx)} /> */}
        </>
    )
}
