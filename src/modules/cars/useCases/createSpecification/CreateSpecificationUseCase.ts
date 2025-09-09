import type { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository.js";

interface IRequest {
    name: string;
    description: string;
}

class CreateSpecificationUseCase {
    constructor(private specificationsRepository: ISpecificationsRepository) { }

    async execute({ name, description }: IRequest): Promise<void> {

        const specificationAlreadyExists = await this.specificationsRepository.findByName(name);

        if (specificationAlreadyExists) {
            throw new Error("Specification Already Exists");
        }

        await this.specificationsRepository.create({ name, description });
    }
}

export {
    CreateSpecificationUseCase
}