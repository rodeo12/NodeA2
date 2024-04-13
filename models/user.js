const mongoose= require("mongoose");

const userSchema= new mongoose.Schema({

   email:{
    type:String,
    required: true
   } ,

   password:{
    type:String,
    required:true,
    length:5
   }

})

const User= mongoose.model("User",userSchema);

module.exports= User;
