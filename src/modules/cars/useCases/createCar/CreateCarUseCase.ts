import { AppError } from "../../../../shared/errors/AppError.js";
import { Car } from "../../infra/typeorm/entities/Car.js";
import { ICarsRepository } from "../../repositories/ICarsRepository.js";

interface IRequest {
    name: string;
    description: string;
    daily_rate: number;
    license_plate: string;
    category_id: string;
    fine_amount: number;
    brand: string;
}

class CreateCarUseCase {

    constructor(private carsRepository: ICarsRepository) {

    }

    async execute({ brand, category_id, daily_rate, description, fine_amount, license_plate, name }: IRequest): Promise<Car> {

        const carAlreadyExists = await this.carsRepository.findByLicensePlate(license_plate);

        if (carAlreadyExists) {
            throw new AppError("Car already exists", 409);
        }

        const car = await this.carsRepository.create({ brand, category_id, daily_rate, description, fine_amount, license_plate, name });

        return car;
    }
}

export {
    CreateCarUseCase
}