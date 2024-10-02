
import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from "dotenv";
import router from "./routes/Authroutes.mjs";

const app=express();
dotenv.config();

app.use(cors());
app.use(express.json())



const Port=process.env.PORT || 4000;



console.log("MongoDB URI:", process.env.MONGODB_URI.toString());
const mondodbstring=process.env.MONGODB_URI.toString();

mongoose.connect(mondodbstring)
.then(()=>console.log("connection estbalish"))
.catch((error)=>console.error(error));

app.use("/auth",router)

app.listen(Port,()=>console.log(`running at ${Port}`))