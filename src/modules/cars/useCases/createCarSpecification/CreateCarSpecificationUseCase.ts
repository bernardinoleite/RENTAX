import { AppError } from "../../../../shared/errors/AppError.js";
import { Car } from "../../infra/typeorm/entities/Car.js";
import { ICarsRepository } from "../../repositories/ICarsRepository.js";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository.js";

interface IRequest {
    car_id: string;
    specifications_id: string[];
}

class CreateCarSpecificationUseCase {

    constructor(private carsRepository: ICarsRepository, private specificationsRepository: ISpecificationsRepository) { }

    async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
        const carExists = await this.carsRepository.findById(car_id);
        if (!carExists) {
            throw new AppError("Car does not exists")
        }

        const specifications = await this.specificationsRepository.findByIds(specifications_id);

        carExists.specifications = specifications;

        await this.carsRepository.create(carExists)

        return carExists;

    }
}

export {
    CreateCarSpecificationUseCase
}