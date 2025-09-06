import { Router } from "express";
import multer from "multer";

import createCategoryController from "../modules/cars/useCases/createCategory/index.js"
import listCategoriesController from "../modules/cars/useCases/listCategories/index.js";
import importCategoryController from "../modules/cars/useCases/importCategory/index.js";

const categoriesRouter = Router();

const upload = multer({ dest: "./tmp" });

categoriesRouter.post("/", async (request, response) => {
    await createCategoryController().handle(request, response);
})

categoriesRouter.get("/", async (request, response) => {
    await listCategoriesController().handle(request, response);
})

categoriesRouter.post("/import", upload.single("file"), async (request, response) => {
    await importCategoryController().handle(request, response);
})

export {
    categoriesRouter
}
