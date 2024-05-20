import mongoose from "mongoose";
import { BooksSchema } from "../schema/books.schema.js";

export const BooksModel = mongoose.model("Books", BooksSchema, "books")