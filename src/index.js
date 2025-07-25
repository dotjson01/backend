import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: "./env"
});

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port: ${process.env.PORT}`);
    });
    console.log("Database connected");
})
.catch((err) => {
    console.log(err);
})











// import mongoose from "mongoose";
// import { DB_NAME } from "./constants.js";
// import express from "express";
// const app = express();

// (async () => {
//     try {
//         // First, try to connect to the database
//         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
//         console.log("Database connected successfully!");

//         // Handle any errors that the Express app might encounter after starting
//         app.on("error", (error) => {
//             console.error("Express app error:", error);
//         });

//         // If the connection is successful, start the server
//         app.listen(process.env.PORT || 8000, () => {
//             console.log(`Server is running on port: ${process.env.PORT }`);
//         });

//     } catch (error) {
//         // If the database connection fails, log the error and exit
//         console.error("ERROR: MongoDB connection failed", error);
//         process.exit(1);
//     }
// })();
