import mongoose from "mongoose";

export const BooksSchema = new mongoose.Schema({
    name: {
        type: String
    },
    imgsUrl: {
        type:  String
    },
    author: {
        type:  String
    },
    desc: {
        type: String
    },
    numOfPage: {
        type: Number
    },
    releaseDate: {
        type: String
    },
    price: {
        type: Number
    }
})