const express = require("express");
const multer = require("multer");
const morgan = require("morgan");
const path = require("path");
const { engine } = require("express-handlebars");

//Initializing
const app = express();

//Settings
app.set("port", 3000);
app.set("views", path.join(__dirname, "views"));
app.engine(".hbs", engine({
    defaultLayout:"main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs"
}));
app.set("view engine", ".hbs");

//Middlewares
app.use(morgan("dev"));
app.use(express.json()); //Si nosotros le enviamos un objeto json el lo va a poder entender.
app.use(express.urlencoded({extended: false})); //Para que pueda entender los datos desde un formulario, el extended false es porque solo serán datos pequeños.

const storage = multer.diskStorage({
    destination: path.join(__dirname, "public/uploads"),
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname)) //path.extname extrae la extension del archivo.
    }
})
app.use(multer({storage}).single("image")); //Tiene que llevar el nombre del campo destinado a subir la imagen.

//Routes
app.use(require("./routes/index"))

module.exports = app;