import mongoose from "mongoose";

const newSeller = new mongoose.Schema({
    email:{
        type:String,
        required : true
    },
    username:{
        type:String,
        required : true
    },
    password:{
        type:String,
        required : true
    }
})
export default mongoose.model("seller", newSeller)