const mongoose = require('mongoose');
const url = 'mongodb+srv://YashJay:YashJay@cluster0.ttiqs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true},(err)=>{
    if (err){
        console.log('Some error occured',err)
    }
    else{
        console.log("Data base connected successfully")
    }

})

require('./user.model');