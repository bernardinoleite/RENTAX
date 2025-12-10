import { RentalsRepository } from "../../infra/typeorm/repositories/RentalsRepository.js";
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider.js";
import { CreateRentalUseCase } from "./CreateRentalUseCase.js";
import { CreateRentalController } from "./CreateRentalController.js";
import { CarsRepository } from "../../../cars/infra/typeorm/repositories/CarsRepository.js";


export default (): CreateRentalController => {
    const rentalsRepository = new RentalsRepository();
    const dayjsDateProvider = new DayjsDateProvider();
    const carsRepository = new CarsRepository()
    const createRentalUseCase = new CreateRentalUseCase(rentalsRepository, dayjsDateProvider, carsRepository);
    const createRentalController = new CreateRentalController(createRentalUseCase)
    return createRentalController;
}