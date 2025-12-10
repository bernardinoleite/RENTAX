import { RentalsRepository } from "../../infra/typeorm/repositories/RentalsRepository.js";
import { ListRentalsByUserUseCase } from "./ListRentalsByUserUseCase.js";
import { ListRentalsByUserController } from "./ListRentalsByUserController.js";

export default (): ListRentalsByUserController => {


    const rentalsRepository = new RentalsRepository();
    const listRentalsByUserUseCase = new ListRentalsByUserUseCase(rentalsRepository)
    const listRentalsByUserController = new ListRentalsByUserController(listRentalsByUserUseCase)
    return listRentalsByUserController
}