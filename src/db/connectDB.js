import mongoose from "mongoose"
import { MONGO_URL } from "./config.js"

export const connectDB = () => {
    mongoose.connect(MONGO_URL).then(() => {
        console.log("The connection was successful");
    }).catch(() => {
        console.log("The connection failed");
    })
}