import "reflect-metadata";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger.json" with { type: "json" };
import { router } from "./routes/index.js";
import { AppDataSource } from "./database/data-source.js";

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);

AppDataSource.initialize()
    .then(() => {
        console.log("📦 Database connected");
        app.listen(2908, () => {
            console.log("🚀 Server is running on port 2908");
        });
    })
    .catch((error) => {
        console.error("❌ Error during Data Source initialization", error);
    });
