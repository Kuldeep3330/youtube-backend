import mongoose, { Schema } from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2"

const videoSchema= new Schema({
    videoFile:{
        type:String,//cloudinary url
        required:trusted,
    },
    thumbnail:{
        type:String, //cloudinary url
        required:true
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    duration:{
        type:Number,
        required:true,
    },
    views:{
        type:Number,
        default:0,
    },
    isPublished:{
        type:Boolean,
        default:true,

    },
    owner:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    }


},{timestamps:true})

videoSchema.plugin(aggregatePaginate);

export const Video= mongoose.model("Video", videoSchema)