import { Router } from "express";

import { CategoriesRepository } from "../repositories/CategoriesRepository.js";
import { CreateCategoryService } from "../services/CreateCategoryService.js";

const categoriesRouter = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRouter.post("/", (request, response) => {

    const { name, description } = request.body;

    const createCategoryService = new CreateCategoryService(categoriesRepository);
    createCategoryService.execute({ name, description })

    return response.status(201).send();
})

categoriesRouter.get("/", (request, response) => {

    const all = categoriesRepository.list();

    return response.json(all);

})

export {
    categoriesRouter
}
