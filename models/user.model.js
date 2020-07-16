var mongoose = require('mongoose');

var userSchema=mongoose.Schema({
    username: String,
    password:String,
    fname:String,
    lname:String,
    mobile:Number,
    email:String,
    nic:String,
    status:{
        type:String,
        default:"Inactive"
    },
    role:{
        type:String,
        default:"medRep"
    }
});

var User = mongoose.model('User', userSchema);
module.exports = User;
