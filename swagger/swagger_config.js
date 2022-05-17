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
                url: "https://vast-castle-72865.herokuapp.com/api/astronomy"
            }
        ]
    },
    apis: ["./swagger/swagger_landings.js", "./swagger/swagger_neas.js"]
}

const specs = swaggerJsDoc(options);

module.exports = specs;