import { CategoriesRepository } from "../../repositories/CategoriesRepository.js";
import { CreateCategoryController } from "./CreateCategoryController.js";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase.js";

const categoriesRepository = CategoriesRepository.getInstance();
const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
const createCategoryController = new CreateCategoryController(createCategoryUseCase);

export {
    createCategoryController
}