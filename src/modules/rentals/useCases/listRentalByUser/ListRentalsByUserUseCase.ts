import { IRentalsRepository } from "../../repositories/IRentalsRepository.js";




class ListRentalsByUserUseCase {

    constructor(private rentalsRepository: IRentalsRepository) { }

    async execute(user_id: string) {
        const rentalsByUser = await this.rentalsRepository.findByUserId(user_id)
        return rentalsByUser
    }
}


export {
    ListRentalsByUserUseCase
}