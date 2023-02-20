const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const path = require('path')

const options = {
    definition:{
        openApi: "3.0.0",
        info:{
            title: "SkillSharing",
            version: "1.0.0"
        },
    },
    apis: [`${path.join(__dirname, "./routes/*.js")}`]
    // apis: ["src/routes/auth","src/routes/collaboration"]
}

//Docs en JSON
const swaggerSpec = swaggerJsDoc(options)


const swaggerDocs = (app, port) =>{
    app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerSpec))
    app.get('/api-doc.json', (req, res) =>{
        res.setHeader('Content-Type', 'application/json')
        res.send(swaggerSpec)
    })
    console.log(`Ver documentación en http://localhost:${port}/api-doc`)
}

module.exports = { swaggerDocs }