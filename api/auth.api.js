
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express.Router();
const mongoose = require('mongoose');
const user = mongoose.model('user');

// app.get('/login',(req,res)=>{
//     res.send("Login api");
// })

app.post('/register',(req,res)=>{
    console.log(req.body)
    user.findOne({
        emailId:req.body.emailId
    }).then(async (data) => {
        if(!data){
            let password = await bcrypt.hash(req.body.password,10)
            let User = new user({
                password: password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                emailId: req.body.emailId,
                isAdmin: req.body.isAdmin,
                enrollmentNumber: req.body.enrollmentNumber
            })
            User.save().then(doc => {
                if(doc){
                    res.json({
                        status: true,
                        message: "User registered succefully!"
                    })
                }else{
                    res.json({
                        status: false,
                        message: "Something went wrong"
                    })
                    console.log(doc)
                }
            })
        }else{
            res.json({
                status: false,
                message: "User already exist"
            })
        }

    }).catch(err => {
        res.json({
            status: false,
            message: "Something went wrong"
        })
        console.log(err)
    })

})

app.post('/login',(req,res) => {
    user.findOne({
        emailId:req.body.emailId
    }).then(async (data) => {
        if(data){
            bcrypt.compare(req.body.password, data.password, (err,result) => {
                if(result){
                    let userPayload = {
                        emailId: data.emailId,
                        id : data._id,
                        isAdmin : data.isAdmin,
                        enrollmentNumber : data.enrollmentNumber
                    }
                    jwt.sign(userPayload, "12345",(err,token) => {
                        if(err){
                            res.json({
                                status: false,
                                message: "Incorrect Username or Password!"
                            })
                        }else{
                            res.json({
                                status: true,
                                message: "Logged in Successfully!",
                                token: token
                            })
                        }
                    })
                }
                else{
                    res.json({
                        status: false,
                        message: "Incorrect Username or Password!"
                    }) 
                }
            })
        }else{
            res.json({
                status: false,
                message: "Incorrect Username or Password!"
            })
        }
    }).catch(err => {
        res.json({
            status: false,
            message: "Something went wrong"
        })
    })
})

module.exports = app