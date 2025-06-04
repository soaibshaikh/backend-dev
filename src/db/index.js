import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectionDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MOGODB Connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB database connection error: ",error );
        process.exit(1);
    }
}

export default connectionDB;