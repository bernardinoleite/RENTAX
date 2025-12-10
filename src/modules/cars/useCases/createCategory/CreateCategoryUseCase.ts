import { AppError } from "../../../../shared/errors/AppError.js";
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
            throw new AppError("Category already exists", 409);
        }

        await this.categoriesRepository.create({ description, name });
    }
}

export {
    CreateCategoryUseCase
};