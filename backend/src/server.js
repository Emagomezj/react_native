import express from "express";
import swaggerUiExpress from "swagger-ui-express";
import { specs } from "./config/swagger.config.js";
import { config as passportConfig } from "./config/passport.config.js";
import paths from "./utils/paths.js";
import { config as configCORS } from "./config/cors.config.js";

import ProductRouter from "./routers/api/product.routes.js";
import UserRouter from "./routers/api/user.routes.js";
import HomeRouter from "./routers/api/home.routes.js";
import SessionRouter from "./routers/api/session.routes.js";
import ReceiptRouter from "./routers/api/receipt.routes.js";

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use("/public", express.static(paths.public));

passportConfig(server);

configCORS(server);

server.use("/api-docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

// Rutas
server.use("/api/products", new ProductRouter().getRouter());
server.use("/api/users", new UserRouter().getRouter());
server.use("/api/home", new HomeRouter().getRouter());
server.use("/api/session", new SessionRouter().getRouter());
server.use("/api/receipts", new ReceiptRouter().getRouter());

server.use("*", (req, res) => {
    res.status(404).send("La ruta indicada no existe");
});

server.listen(8080, () => {
    console.log(`Ejecutándose en http://localhost:8080`);
});