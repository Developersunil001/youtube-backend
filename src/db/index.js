// import mongoose from "mongoose";
// import { DB_NAME } from "../constants.js"

// const connectDB = async () => {
//       try {
//             const connectInsurance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//             console.log(`\n MongoDB connected !! DB Host : ${connectInsurance.connection.host}`)
//       } catch (error) {
//             console.log("MONGODB connection FAILED ", error);
//             process.exit(1);
//       }
// }

// export default connectDB;


import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
      try {
            const connectInsurance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`, {
                  useNewUrlParser: true,
                  useUnifiedTopology: true,
                  // Other options you may want to add
            });
            console.log(`\n MongoDB connected !! DB Host : ${connectInsurance.connection.host}`);
      } catch (error) {
            console.error("Failed to connect to MongoDB:", error);
            process.exit(1);
      }
};

export default connectDB;
