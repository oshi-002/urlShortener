
const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    shortId :{
        type: String ,
        require: true , 
        unique: true 
    }, 
    redirectURL:{
        type: String ,
        require: true  
          
    } ,
    visitHistory: [{
        timestamp: {type: Number}
    }]
}, {timestamps:true})

const URL = mongoose.model('url' , userSchema)
module.exports = URL;