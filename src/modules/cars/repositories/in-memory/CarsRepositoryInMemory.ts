import { AppError } from "../../../../shared/errors/AppError.js";
import { ICreateCarDTO } from "../../dtos/ICreateCarDTO.js";
import { Car } from "../../infra/typeorm/entities/Car.js";
import { ICarsRepository } from "../ICarsRepository.js";



class CarsRepositoryInMemory implements ICarsRepository {


    private cars: Car[] = [];

    async create({ brand, category_id, daily_rate, description, fine_amount, license_plate, name, specifications, id }: ICreateCarDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, { brand, category_id, daily_rate, description, fine_amount, license_plate, name, specifications, id });

        this.cars.push(car);
        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
        const car = this.cars.find((car) => car.license_plate === license_plate);
        return car; // ✅ se não encontrar, retorna undefined
    }


    async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
        const cars = this.cars.filter(car => {
            if (!car.available) return false; // sempre obrigatório

            // filtros opcionais
            if (brand && car.brand !== brand) return false;
            if (category_id && car.category_id !== category_id) return false;
            if (name && car.name !== name) return false;

            return true; // se chegou aqui, passa
        });

        return cars;
    }

    async findById(id: string): Promise<Car> {
        const car = this.cars.find(car => car.id === id)
        if (!car) {
            throw new AppError(`Car with id ${id} not found.`);
        }
        return car
    }

    async updateAvailable(id: string, available: boolean): Promise<void> {
        const carIndex = this.cars.findIndex(car => car.id === id);
        this.cars[carIndex].available = available
    }

}

export {
    CarsRepositoryInMemory
}