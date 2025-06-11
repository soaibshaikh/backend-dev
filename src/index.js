// require('dotenv').config({path: './env'});
import dotenv from "dotenv";
import connectionDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: './env'
})




connectionDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})

/*
import express from "express";
const app = express();

;(async()=>{
    try {
        await mongoose.connect(`${process.env.DB_URI}/${DB_NAME}`);
        app.on("error",(error)=>{
            console.log("EXPRESS_ERR:", error);
            throw error;
        });

        app.listen(process.env.PORT,()=>{
            console.log(`App is runnig on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.error("ERROR: ",error);
        throw error;
    }
})();
*/