import swaggerJSDoc from "swagger-jsdoc";


const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.1",
        info: {
            title: "Documentación API Gestión de usuarios, mascotas y adopciones",
            version: "1.0.0",
            description: "API de Adopciones, usuarios y mascotas"
        }
    },
    apis:["./src/docs/**/*.yaml"]
}

export const specs = swaggerJSDoc(swaggerOptions);