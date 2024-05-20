import express from "express";
import { create } from "express-handlebars";
import { connectDB } from "./db/connectDB.js";
import { BooksModel } from "./db/model/books.model.js";
import { BooksSchema } from "./db/schema/books.schema.js";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded());
connectDB();

const hbs = create({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: "views/layouts",
    partialsDir: "views/partials",
    helpers: {
        eq: (l, r) => {
            return l === r
        }
    }
})

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views/pages");

BooksModel.createCollection();

app.get("/", (req, res) => {
    res.render("hompage")
})

app.get("/e-books", async(req, res) => {
    const books = await BooksModel.find().lean();

    res.render("e-books", {
        books
    })
})

app.get("/add-e-book", (req, res) => {
    res.render("add-e-book")
})

app.post("/add-e-book", async(req, res) => {
    const data = req.body;

    await BooksModel.create({
        name: data.name,
        imgsUrl: data.imgsUrl,
        author: data.author,
        desc: data.desc,
        numOfPage: data.numOfPage,
        releaseDate: data.releaseDate,
        price: data.price
    })
    

    // res.redirect("hompage")
    res.redirect("/add-e-book")
})

app.get("/add-e-books/:id/delete", async(req, res) => {
    const id = req.params.id;

    await BooksModel.deleteOne({
        _id: id
    })

    res.redirect("/e-books")
})

app.get("/add-e-books/:id", async(req, res) => {
    const id = req.params.id;
    const books = await BooksModel.findById(id).lean();

    console.log(books);
    

    res.render("add-e-book", {
        books,
        isEditing: true
    })
})

app.post("/add-e-books/:id", async(req, res) => {
    const id = req.params.id;
    const data = req.body;

    await BooksModel.updateOne(
        {_id:id},
        {
            $set: {
                name: data.name,
                imgsUrl: data.imgsUrl,
                author: data.author,
                desc: data.desc,
                numOfPage: data.numOfPage,
                releaseDate: data.releaseDate,
                price: data.price
            }
        }
    )
    

    res.render("add-e-book")
})


app.listen(port, () => {
    console.log(`App is running on ${port}`)
});
