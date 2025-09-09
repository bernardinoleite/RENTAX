import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger.json" with { type: "json" };
import { router } from "./routes/index.js";
import { AppDataSource } from "./database/data-source.js";
import { AppError } from "./errors/AppError.js";

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message
        });
    }

    return response.status(500).json({ message: `Internal server error ${err.message}`, status: "Error" })
})

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

