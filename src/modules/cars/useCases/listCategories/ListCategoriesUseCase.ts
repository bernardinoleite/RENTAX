import type { Category } from "../../model/Category.js";
import type { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository.js";
import type { ICategoriesRepository } from "../../repositories/ICategoriesRepository.js";


class ListCategoriesUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {

    }

    execute(): Category[] {
        const categories = this.categoriesRepository.list();
        return categories;
    }

}


export {
    ListCategoriesUseCase
}