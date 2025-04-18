import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

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

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()

    this.password = bcrypt.hash(this.password, 10)
    next()    
})

// JWT token method
userSchema.methods.generateJWT = function () {
    return jwt.sign(
      { _id: this._id, email: this.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
  };

userSchema.methods.isPasswordCorrect= async function(password){
    return await bcrypt.compare(password, this.password);
}

export const User = mongoose.model("User", userSchema);