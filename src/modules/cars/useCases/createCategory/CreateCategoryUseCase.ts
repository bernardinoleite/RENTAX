import type { ICategoriesRepository } from "../../repositories/ICategoriesRepository.js";

interface IRequest {
    name: string;
    description: string;
}

class CreateCategoryUseCase {

    constructor(private categoriesRepository: ICategoriesRepository) { }
    async execute({ name, description }: IRequest): Promise<void> {

        const categoriesAlreadyExists = await this.categoriesRepository.findByName(name);

        if (categoriesAlreadyExists) {
            throw new Error("Category already exists");
        }
        await this.categoriesRepository.create({ description, name });
    }
}

export {
    CreateCategoryUseCase
};