import { SpecificationsRepository } from "../../infra/typeorm/repositories/SpecificationsRepository.js";
import { CarsRepository } from "../../infra/typeorm/repositories/CarsRepository.js";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase.js";

import { CreateCarSpecificationController } from "./CreateCarSpecificationController.js";

export default (): CreateCarSpecificationController => {

    const specificationsRepository = new SpecificationsRepository();
    const carsRepository = new CarsRepository();
    const createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepository, specificationsRepository);
    const createCarSpecificationController = new CreateCarSpecificationController(createCarSpecificationUseCase)

    return createCarSpecificationController
}