import { CategoriesRepository } from "../../repositories/CategoriesRepository.js";
import { ListCategoriesController } from "./ListCategoriesController.js";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase.js";



const categoriesRepository = CategoriesRepository.getInstance();
const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);
const listCategoriesController = new ListCategoriesController(listCategoriesUseCase);


export {
    listCategoriesController
}