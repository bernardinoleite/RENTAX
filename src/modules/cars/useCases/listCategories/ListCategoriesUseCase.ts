import type { Category } from "../../infra/typeorm/entities/Category.js";
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