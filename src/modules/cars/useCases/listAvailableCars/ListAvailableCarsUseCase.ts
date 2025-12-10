import { Car } from "../../infra/typeorm/entities/Car.js";
import { ICarsRepository } from "../../repositories/ICarsRepository.js";

interface IRequest {
    category_id?: string;
    brand?: string;
    name?: string;
}

class ListAvailableCarsUseCase {

    constructor(private carsRepository: ICarsRepository) {
    }

    async execute({ brand, category_id, name }: IRequest): Promise<Car[]> {
        const cars = await this.carsRepository.findAvailable(brand, category_id, name);
        return cars;
    }
}

export {
    ListAvailableCarsUseCase
}