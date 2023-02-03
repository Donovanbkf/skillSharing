const fs = require('fs')
const epxress = require('express')
const router = epxress.Router()

const pathRouter = `${__dirname}`

const removeExtension = (fileName) => {
    return fileName.split('.').shift()
}

fs.readdirSync(pathRouter).filter((file) => {
    const fileWithOutExt = removeExtension(file)
    if (fileWithOutExt != "index") {
        // router.use(`/${fileWithOutExt}`, require(`./${fileWithOutExt}`)) //TODO: localhost/users
        router.use(`/${fileWithOutExt}`,require(`./${fileWithOutExt}`)) //TODO: localhost/users
        console.log('CARGAR RUTA ---->', fileWithOutExt)
    }
})

router.get('/', (req, res) => {
    res.render('index')
})

router.get('*', (req, res) => {
    res.status(404)
    res.send({ error: 'Not fooound' })
})




module.exports = router