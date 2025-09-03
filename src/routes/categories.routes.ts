import { Router } from "express";

import { CategoriesRepository } from "../modules/cars/repositories/CategoriesRepository.js";
import { createCategoryController } from "../modules/cars/useCases/createCategory/index.js";
import { listCategoriesController } from "../modules/cars/useCases/listCategories/index.js";

const categoriesRouter = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRouter.post("/", (request, response) => {
    createCategoryController.handle(request, response);
})

categoriesRouter.get("/", (request, response) => {
    listCategoriesController.handle(request, response)
})

export {
    categoriesRouter
}
