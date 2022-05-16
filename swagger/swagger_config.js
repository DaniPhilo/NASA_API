const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Landings / NEAs API",
            version: "1.0.0",
            description: "Back-end API proyect for The Bridge"
        },
        servers: [
            {
                url: "http://localhost:3001/api/astronomy"
            }
        ]
    },
    apis: ["./swagger/swagger_landings.js", "./routes/neas_routes.js"]
}

const specs = swaggerJsDoc(options);

module.exports = specs;