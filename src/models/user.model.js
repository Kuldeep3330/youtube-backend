import mongoose, { Schema } from "mongoose";

const userSchema= new Schema({
    username:{
        type:String,
        required:[true, "username is required"],
        unique:true,
        lowercase:true,
        trim:true,
        index:true //to enable searching very optimized
    },
    email:{
        type:String,
        required:[true, "email is required"],
        unique:true,
        lowercase:true,
        trim:true,
    },
    fullname:{
        type:String,
        required:true,
    },
    avatar:{
        type:String, //cloudianry url
        required:true,
    },
    coverImage:{
        type:String,
    },
    password:{
        type:String,
        required:[true, "Password is required"]
    },
    refreshToken:{
        type:String,
    },
    watchHistory:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"Video"
        }
    ]

},{timestamps:true})

export const User = mongoose.model("User", userSchema);