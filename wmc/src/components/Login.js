import React from 'react'
import {TextField, Button} from '@material-ui/core';

export default function Login() {
    return (
        <div className="d-flex justify-content-center align-items-center login-page">
            <form className="col-lg-5 col-md-5 col-11 px-lg-5 px-md-4 px-2 shadow bg-light py-5" >
                <h1 className="text-center py-2">Login</h1>
                <TextField
                    label= "Email" 
                    required
                    type = "email"
                    className = "mx-3 mt-3 mb-3 col-10"
                />
                <TextField
                    label= "Password" 
                    required
                    type = "password"
                    className = "mx-3 mb-5 col-10"
                />
                <div className="d-flex justify-content-center align-items-enter">
                    <Button type = "submit" variant="contained" className="text-center mx-auto w-50" color="primary">Submit</Button>
                </div>
                
            </form>
        </div>
         
    )
}
