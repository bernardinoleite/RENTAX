import { AppDataSource } from "../typeorm/data-source.js";
import { app } from "./app.js";

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

