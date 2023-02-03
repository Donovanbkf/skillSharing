require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars');
const path = require('path')
const { dbConect } = require('./config/database')
const app = express()

// settings
const port = process.env.PORT || 3332
app.listen(port, () => {
    console.log('listening on port ' + port)
})
app.set("views", path.join(__dirname, "views"));
dbConect()
app.set('trust proxy', true);


// config view engine
const hbs = handlebars.create({
  defaultLayout: "main",
  layoutsDir: path.join(app.get("views"), "layouts"),
  partialsDir: path.join(app.get("views"), "partials"),
  extname: ".hbs",
});
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");

// middleware
app.use(morgan('dev'))
// app.use(morgan('combined'))
app.use(express.json()) // para postman JSON hace que funcione ¿?
app.use(express.urlencoded({ extended: true})) // para los form hace que funcione ¿? y son true elimina el [Object: null prototype] { }


// rutas
app.use(require('./routes/'))