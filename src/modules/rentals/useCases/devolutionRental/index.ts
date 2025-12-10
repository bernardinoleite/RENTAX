import { RentalsRepository } from "../../infra/typeorm/repositories/RentalsRepository.js";
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider.js";
import { CarsRepository } from "../../../cars/infra/typeorm/repositories/CarsRepository.js";

import { DevolutionRentalUseCase } from "./DevolutionRentalUseCase.js";

import { DevolutionRentalController } from "./DevolutionRentalController.js";
export default (): DevolutionRentalController => {
    const rentalsRepository = new RentalsRepository();
    const dayjsDateProvider = new DayjsDateProvider();
    const carsRepository = new CarsRepository()
    const devolutionRentalUseCase = new DevolutionRentalUseCase(rentalsRepository, carsRepository, dayjsDateProvider);
    const devolutionRentalController = new DevolutionRentalController(devolutionRentalUseCase)
    return devolutionRentalController;
}