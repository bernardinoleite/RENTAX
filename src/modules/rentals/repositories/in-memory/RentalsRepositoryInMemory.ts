import { ICreateRentalDTO } from "../../dto/ICreateRentalDTO.js";
import { Rental } from "../../infra/typeorm/entities/Rental.js";
import { IRentalsRepository } from "../IRentalsRepository.js";



class RentalsRepositoryInMemory implements IRentalsRepository {

    private rentals: Rental[] = []


    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        return this.rentals.find(rentals => rentals.user_id === user_id && !rentals.end_date)
    }
    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        return this.rentals.find(rentals => rentals.car_id === car_id && !rentals.end_date)
    }

    async create({ car_id, expected_return_date, user_id }: ICreateRentalDTO): Promise<Rental> {
        const rental = new Rental();

        Object.assign(rental, { car_id, expected_return_date, user_id, start_date: new Date() })
        this.rentals.push(rental)
        return rental;
    }
    async findById(id: string): Promise<Rental> {
        return this.rentals.find(rental => rental.id === id)
    }
    async findByUserId(user_id: string): Promise<Rental[]> {
        return this.rentals.filter(rental => rental.user_id === user_id)
    }

}

export {
    RentalsRepositoryInMemory
}