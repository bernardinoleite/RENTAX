import { ICreateRentalDTO } from "../dto/ICreateRentalDTO.js";
import { Rental } from "../infra/typeorm/entities/Rental.js";


interface IRentalsRepository {

    findOpenRentalByUser(user_id: string): Promise<Rental>;
    findOpenRentalByCar(car_id: string): Promise<Rental>;
    create(data: ICreateRentalDTO): Promise<Rental>;
    findById(id: string): Promise<Rental>
    findByUserId(user_id: string): Promise<Rental[]>
}


export {
    IRentalsRepository
}