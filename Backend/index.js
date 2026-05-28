import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import cors from "cors"

const app = express()

import userRoutes from "../Backend/routes/user.route.js"
import generatingRoute from "../Backend/routes/generatescript.route.js"

dotenv.config()

app.use(cors({

  origin: ["http://localhost:5173", "http://localhost:5174/"], 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true 
}));

const port = process.env.PORT || 4355
const uri = process.env.mongodb_uri

app.use(express.json())

try {
    mongoose.connect(uri)
    console.log("Mongodb connected successfully")
} catch (error) {
    console.log("Error at connecting mognoose")
    console.log(error)
}


app.use("/uploads", express.static("uploads"));
app.use("/slides", express.static("slides"));

app.use("/user" , userRoutes);
app.use("/generate" , generatingRoute);

app.listen(port,()=>{
    console.log("App is listening on port ",port)
})