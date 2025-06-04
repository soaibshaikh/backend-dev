// require('dotenv').config({path: './env'});
import dotenv from "dotenv";
import connectionDB from "./db/index.js";

dotenv.config({
    path: './env'
})




connectionDB();

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