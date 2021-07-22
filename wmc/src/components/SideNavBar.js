import { Icon } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import './home.scss'
// import { ReactComponent as HomeIcon} from './svg/home.svg'
// import { ReactComponent as TripIcon} from './svg/trip.svg'
// import { ReactComponent as TruckIcon} from './svg/truck.svg'
// import { ReactComponent as SettingsIcon} from './svg/settings.svg'
import {  useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { HomeContext } from '../Context/HomeContext'
import { AssignmentOutlined, CalendarViewDay, CalendarViewDayOutlined, EventNoteOutlined, MenuBookOutlined, SchoolOutlined } from '@material-ui/icons'
import { currentUser } from '../Services/AuthServices'

export default function SideNavBar() {
    const route = useLocation()
    const path = route.pathname.split('/')[1];
    const {navigator,setNavigator} = useContext(HomeContext)
    const [user,setUser] = useState(currentUser.value)
    
    useEffect(() => {
    let AuthObservalble = currentUser.subscribe(data => setUser(data))

    return () => {
      AuthObservalble.unsubscribe();
    }
  },[])

    return (
        <div className="w-100 h-100 side-navbar">
            <img className="mt-3 mx-3" src="guide.png"></img>
            <div className="d-flex flex-column mt-5">
                <div onClick={() => setNavigator(0)} className={"w-100 d-flex px-4 py-3 side-nav-item" + (navigator===0 ? " active" : "")} > 
                    <AssignmentOutlined />
                    Todos
                </div>
                
                <div onClick={() => setNavigator(2)} className={"w-100 d-flex px-4 py-3 side-nav-item" + (navigator===2 ? " active" : "")} >
                    <MenuBookOutlined />
                    Course
                </div>
                {!user.isAdmin && <div onClick={() => setNavigator(1)} className={"w-100 d-flex px-4 py-3 side-nav-item" + (navigator===1 ? " active" : "")} >
                    <EventNoteOutlined />
                    Time Table
                </div>}
                {/* <div onClick={() => setNavigator(3)} className={"w-100 d-flex px-4 py-3 side-nav-item" + (navigator===3 ? " active" : "")} >
                    <Icon style={{color: "white"}} ></Icon>
                    Settings
                </div> */}
            </div>
        </div>
    )
}
