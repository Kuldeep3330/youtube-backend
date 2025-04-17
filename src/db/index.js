// import mongoose from "mongoose";
// import { DB_NAME } from "../constants.js";

// const connectDB = async ()=>{
//     try {
//        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       })
    //    console.log(connectionInstance);
    //    console.log(`\n MONGODB connected || DB HOST ${connectionInstance.connection.host}`)
        
//     } catch (error) {
//         console.log("MONGODB connection error:", error);        
//         process.exit(1)
//     }
// }

// export {connectDB}

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/mydatabase');
    console.log('MongoDB Connected ✅');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit on failure
  }
};

export { connectDB }