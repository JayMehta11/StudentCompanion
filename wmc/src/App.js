import React, { useContext, useEffect, useState } from 'react';
import {BrowserRouter as Router, Switch , Route, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import { currentUser } from './Services/AuthServices';
import { GlobalLoadingContext } from './Context/GlobalLoadingContext';
import GlobalLoader from './components/GlobalLoader';
import {toast} from 'react-toastify';
import HomeContextProvider from './Context/HomeContext';


function App() {

  const [user,setUser] = useState("loading");
  const {globalLoading,setGlobalLoading} = useContext(GlobalLoadingContext);

  useEffect(() => {
    let AuthObservalble = currentUser.subscribe(data => setUser(data))

    return () => {
      AuthObservalble.unsubscribe();
    }
  },[])
  if(user===null && (window.location.pathname!=="/login" && window.location.pathname!=="/register")){
    window.location = "/login";
  }

  return (

    <>
    {(user==="loading" || globalLoading) && <GlobalLoader />}

    {user!=="loading" && 
      <Router>
        <Switch>
          <Route path="/" exact ><HomeContextProvider><Home></Home></HomeContextProvider></Route>
          <Route path="/login" exact><Login></Login></Route>
          <Route path="/register" exact><Register></Register></Route>
        </Switch>
      </Router>
    }
    </>
    
  );
}

export default App;
