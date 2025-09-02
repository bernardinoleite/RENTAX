// o service nao deve conhecer o response ou nao deve saber o framework que estas a usar

import type { CategoriesRepository } from "../repositories/CategoriesRepository.js";

interface IRequest {
    name: string;
    description: string;
}

class CreateCategoryService {

    constructor(private categoriesRepository: CategoriesRepository) {

    }
    execute({ name, description }: IRequest): void {

        const categoriesAlreadyExists = this.categoriesRepository.findByName(name);

        if (categoriesAlreadyExists) {
            throw new Error("Category already exists");
        }

        this.categoriesRepository.create({ description, name });
    }

}


export {
    CreateCategoryService
};