import express from "express";
import { categoriesRouter } from "./routes/categories.routes.js";
import { specificationsRouter } from "./routes/specifications.routes.js";

const app = express();

app.use(express.json());

app.use("/categories", categoriesRouter);
app.use("/specifications", specificationsRouter);

app.listen(2908, () => {
    console.log("Server is running");

})