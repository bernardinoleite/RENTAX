import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger.json" with { type: "json" };

import { router } from "./routes/index.js";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);
app.listen(2908, () => {
    console.log("Server is running");

})