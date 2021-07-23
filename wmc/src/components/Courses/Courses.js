import { Fab, IconButton, Button, TextField } from '@material-ui/core'
import { AccessAlarmOutlined, AddOutlined, ArrowForward, ArrowForwardIosOutlined, AssignmentTurnedInOutlined, DeleteOutlined, EditOutlined, ExpandLessOutlined, ExpandMoreOutlined, Filter, NavigateNextOutlined } from '@material-ui/icons'
import React, { useContext, useEffect, useState } from 'react'
// import { deleteTodos, getTodos, updateTodos } from '../../Services/TodoServices';
import {toast} from 'react-toastify'
import './course.scss'
import PulseLoader from 'react-spinners/PulseLoader'
import Operation from './Operation';
import * as moment from 'moment'
import { GlobalLoadingContext } from '../../Context/GlobalLoadingContext';
import ConfirmDialog from '../ConfirmDialog';

export default function Courses() {

    const [courses,setcourses] = useState("loading");
    const [loading,setLoading] = useState(false);
    // const [filter,setFilter] = useState("All");
    const [openOperationDialog,setOpenOperationDialog] = useState(false);
    // const [todoDescriptionOpen,setTodoDescriptionOpen] = useState(-1);
    // const [todoUpdateDetails,setTodoUpdateDetails] = useState(false);
    const {setGlobalLoading} = useContext(GlobalLoadingContext)
    // const [ConfirmDeleteDialog,setConfirmDeleteDialog] = useState({
    //     open: false,
    //     idx: false
    // });

    let CloseDialog = () => {
        setOpenOperationDialog(false);
    }
    // let CloseConfirmDeleteDialog = () => {
    //     setConfirmDeleteDialog({
    //         open: false,
    //         idx: false
    //     })
    // }

    // let getTableScaling = () => {
    //     let todo = document.querySelectorAll(".todo-details");
    //     let todosContainer = document.querySelector(".todos-container");
    //     let mainContainer = document.querySelector("#main-container")
    //     if(todo !== undefined && todosContainer!==undefined && todo.length > 0){
    //         if(mainContainer.offsetWidth < todo[0].offsetWidth){
    //             for(let i=0;i<todo.length;i++){
    //                 todo[i].style.transform = `scale(${(mainContainer.offsetWidth / todo[i].offsetWidth) - 0.03})`
    //                 todo[i].style.transformOrigin = "center center";
    //                 todosContainer.style.rowGap = "0rem 0rem"
    //             }
    //         }
    //         else{
    //             for(let i=0;i<todo.length;i++){
    //                 todo[i].style.transform = `scale(1)`
    //                 todo[i].style.transformOrigin = "0% 0%"
    //                 todosContainer.style.rowGap = "0rem 0.8rem"
    //             }
    //         }
            
    //     }
        
    // }

    // let FetchTodos = async () => {
    //     setLoading(true);
    //     try{
            
    //         let TodosResponse = await getTodos(filter);
    //         setLoading(false);
    //         if(TodosResponse.status){
    //             setTodos(TodosResponse.todos)
    //         }else{
    //             setTodos([])
    //             toast.error("Unable to get Todos") 
    //         }
    //     }catch(err){
    //         setLoading(false);
    //         toast.error("Unable to get Todos")
    //     }
        
        
    // }

    

    // let UpdateTodoItem = (todo) => {
    //     let updatedList = todos.map(item => 
    //         {
    //           if (item._id == todo._id){
    //             return todo; //gets everything that was already in item, and updates "done"
    //           }
    //           return item; // else return unmodified item 
    //         }); 
            
    //     setTodos(updatedList);    
    // }

    // let MarkComplete = async (todo) => {
    //     setGlobalLoading(true)
    //     todo = {...todo,done: !todo.done};
    //     try{
    //         let UpdateTodoResponse = await updateTodos(todo);
            
    //         if(UpdateTodoResponse.status){
    //             toast.success(UpdateTodoResponse.message)
    //             await UpdateTodoItem(todo);
    //             setGlobalLoading(false)
    //         }else{
    //             toast.error(UpdateTodoResponse.message)
    //             setGlobalLoading(false)
    //         }
    //     }catch(err){
    //         setGlobalLoading(false)
    //         toast.error("Unable to Update Todo")
    //     }
    // }

    // let DeleteTodo =async (idx) => {
    //     CloseConfirmDeleteDialog()
    //     setGlobalLoading(true);

    //     try{
    //         let DeleteTodoResponse = await deleteTodos(idx);
            
    //         if(DeleteTodoResponse.status){
    //             toast.success(DeleteTodoResponse.message)
    //             await FetchTodos()
    //             setGlobalLoading(false)
    //         }else{
    //             toast.error(DeleteTodoResponse.message)
    //             setGlobalLoading(false)
    //         }
    //     }catch(err){
    //         setGlobalLoading(false)
    //         toast.error("Unable to Delete Todo")
    //     }

    // }

    // useEffect(() => {
    //     FetchTodos(filter);
    // },[filter])

    // useEffect(() => {
    //     getTableScaling();

    //     window.addEventListener('resize',getTableScaling)

    //     return () => {
    //         window.removeEventListener('resize',getTableScaling)
    //     }
    // },[todos])

    // let getDate = (seconds) => {
    //     return moment(new Date(seconds * 1000)).format('DD-MM-YYYY')
    // }
    return (
        <>
            <div className="w-100 mt-4 px-lg-5 px-md-4 px-1 d-flex justify-content-between align-items-center">
                <Button variant="contained" onClick={() => setOpenOperationDialog(true)} startIcon={<AddOutlined />} color="primary">Add Courses</Button>
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
            // <table className={`w-100 rounded-3 position-relative mt-4 table px-lg-5 px-md-4 px-1 mx-auto`} id="table">
            //     <thead>
            //         <th></th>
            //         <th></th>
            //         <th></th>
            //         <th></th>
            //         <th></th>
            //     </thead>
            //     <tbody>

            //         {todos.map(todo => 
            //             <tr>
            //                 <td key={todo._id} style={{borderRadius: "10px",padding: "0px"}} colSpan="5">
            //                     <tr className="w-100 justify-content-between">
            //                         <td style={{width: "1%"}}><Fab className={"fab-button " + (todo.done ? "completed" :"not_completed")} ><AssignmentTurnedInOutlined className={(todo.done ? "completed" :"not_completed")} /></Fab></td>
            //                         <td>{todo.task}</td>
            //                         <td>{getDate(todo.created_at)}</td>
            //                         <td className={todo.done ? "completed" :"not_completed"} style={{backgroundColor: "white"}}><li>{todo.done ? "Completed": "Pending"}</li></td>
            //                         <td><IconButton><NavigateNextOutlined style={{color: "lightgrey"}} /></IconButton></td>
            //                     </tr>
            //                 </td>
            //             </tr>
                       
            //         )}
            //     </tbody>
            // </table>
            <div className="w-100 mt-4 d-flex flex-column justify-content-between align-items-center course-container px-lg-5 px-md-4 px-1 mx-auto">
               {courses.map((course,i) => 
                    <span key={course._id} className="w-100 course-details">
                        {/* <div className="w-100 d-flex justify-content-between align-items-center course py-0">
                            <span><Fab className={"col-1 fab-button " + (course.done ? "completed" :"not_completed")} ><AssignmentTurnedInOutlined className={(course.done ? "completed" :"not_completed")} /></Fab></span>
                            <span className="col-4">{course.task}</span>
                            <span className="cl-3">{getDate(course.created_at)}</span>
                            <span className="col-3" className={course.done ? "completed" :"not_completed"} style={{backgroundColor: "white"}}><li>{course.done ? "Completed": "Pending"}</li></span>
                            <span className="col-1">{courseDescriptionOpen!==i ? <NavigateNextOutlined style={{color: "lightgrey",cursor: 'pointer'}} /> : <ExpandLessOutlined style={{color: "lightgrey",cursor: 'pointer'}} />}</span>
                        </div> */}
                        {/* {courseDescriptionOpen===i && <div className="w-100 mt-4 ps-3 todo-description">
                            <h5>Description</h5>
                            <p className="ps-2">{todo.description}</p>
                            <div className="mt-3 mb-3 d-flex align-items-center flex-wrap">
                                <Button variant="contained" onClick={() => MarkComplete(todo)} startIcon={<AssignmentTurnedInOutlined />} className="mark-completed-btn">{todo.done ? "Mark Pending" : "Mark Complted"}</Button>
                                <Button variant="contained" startIcon={<AccessAlarmOutlined />} color="primary">Set Reminder</Button>
                                <Button variant="outlined" onClick={async () => {
                                    await setTodoUpdateDetails(todo);
                                    setOpenOperationDialog(true);
                                }} startIcon={<EditOutlined />}>Edit</Button>
                                <Button variant="contained" onClick={() => {setConfirmDeleteDialog({
                                    open: true,
                                    idx: todo._id
                                })}} startIcon={<DeleteOutlined />} className="delete-btn">Delete</Button>
                            </div>
                        </div>} */}
                    </span>
               )} 
            </div>
            }

            <Operation open={openOperationDialog} close={CloseDialog} />
            {/* <ConfirmDialog open={ConfirmDeleteDialog.open} close={CloseConfirmDeleteDialog} action={() => DeleteTodo(ConfirmDeleteDialog.idx)} /> */}
        </>
    )
}
