import { Repository } from "typeorm";
import { ICreateCarDTO } from "../../../dtos/ICreateCarDTO.js";
import { ICarsRepository } from "../../../repositories/ICarsRepository.js";
import { Car } from "../entities/Car.js";
import { AppDataSource } from "../../../../../shared/infra/typeorm/data-source.js";

class CarsRepository implements ICarsRepository {

    private repository: Repository<Car>;
    constructor() {
        this.repository = AppDataSource.getRepository(Car);
    }


    async create({ brand, category_id, daily_rate, description, fine_amount, license_plate, name, specifications, id }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({ brand, category_id, daily_rate, description, fine_amount, license_plate, name, specifications, id });
        await this.repository.save(car);
        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({ where: { license_plate } });
        return car;
    }

    async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
        const carsQuerys = this.repository.createQueryBuilder("c").where("available = :available", { available: true });

        if (brand) carsQuerys.andWhere("c.brand = :brand", { brand });
        if (name) carsQuerys.andWhere("c.name = :name", { name });
        if (category_id) carsQuerys.andWhere("c.category_id = :category_id", { category_id });

        const cars = await carsQuerys.getMany();
        return cars;

    }

    async findById(id: string): Promise<Car> {
        const car = await this.repository.findOne({ where: { id } })
        return car
    }

    async updateAvailable(id: string, available: boolean): Promise<void> {
        await this.repository
            .createQueryBuilder()
            .update(Car)
            .set({ available })
            .where("id = :id", { id })
            .execute();
    }


}

export {
    CarsRepository
}