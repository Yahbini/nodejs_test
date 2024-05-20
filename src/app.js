import express from "express";
import { create } from "express-handlebars";
import { connectDB } from "./db/connectDB.js";

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
app.set("views", "views/pages")

app.listen(port, () => {
    console.log(`App is running on ${port}`)
});
