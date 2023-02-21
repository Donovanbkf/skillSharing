require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars');
const path = require('path')
const { dbConect } = require('./config/database')
const app = express()
// const { swaggerDocs } = require('./helpers/helperSwagger')


// settings
const port = process.env.PORT || 3332
app.listen(port, () => {
    console.log('listening on port ' + port)
})
// swaggerDocs(app, port)
app.set("views", path.join(__dirname, "views"));
dbConect()
app.set('trust proxy', true);


// middleware
app.use(morgan('dev'))
app.use(express.json()) // para postman JSON hace que funcione ¿?
app.use(express.urlencoded({ extended: true})) // para los form hace que funcione ¿? y son true elimina el [Object: null prototype] { } 
//extended false es mas simple y el true permite objetos anidados enn la peticion del formulario


// rutas
app.use(require('./routes/'))