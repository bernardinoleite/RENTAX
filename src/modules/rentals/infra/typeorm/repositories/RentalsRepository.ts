import { Repository } from "typeorm";
import { ICreateRentalDTO } from "../../../dto/ICreateRentalDTO.js";
import { IRentalsRepository } from "../../../repositories/IRentalsRepository.js";
import { Rental } from "../entities/Rental.js";
import { AppDataSource } from "../../../../../shared/infra/typeorm/data-source.js";


class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>

    constructor() {
        this.repository = AppDataSource.getRepository(Rental);
    }


    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        const openByUser = await this.repository.findOne({ where: { user_id, end_date: null } })
        return openByUser;
    }
    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        const openByCar = await this.repository.findOne({ where: { car_id, end_date: null } })
        return openByCar;
    }
    async create({ car_id, expected_return_date, user_id, end_date, id, total }: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({ car_id, expected_return_date, user_id, id, end_date, total })
        return await this.repository.save(rental)
    }

    async findById(id: string): Promise<Rental> {
        const rental = await this.repository.findOne({ where: { id } })
        return rental
    }

    async findByUserId(user_id: string): Promise<Rental[]> {
        const rentals = await this.repository.find({
            where: {
                user_id
            },
            relations: ["car"],
        })

        return rentals
    }

}

export {
    RentalsRepository
}