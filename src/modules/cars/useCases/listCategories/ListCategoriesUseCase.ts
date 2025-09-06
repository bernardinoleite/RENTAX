import type { Category } from "../../entities/Category.js";
import type { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository.js";
import type { ICategoriesRepository } from "../../repositories/ICategoriesRepository.js";


class ListCategoriesUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {

    }

    async execute(): Promise<Category[]> {
        const categories = await this.categoriesRepository.list();
        return categories;
    }

}


export {
    ListCategoriesUseCase
}