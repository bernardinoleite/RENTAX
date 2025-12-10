import { CarsRepository } from "../../infra/typeorm/repositories/CarsRepository.js";
import { CreateCarUseCase } from "./CreateCarUseCase.js";
import { CreateCarController } from "./CreateCarController.js";

export default (): CreateCarController => {
    const carsRepository = new CarsRepository();
    const createCarUseCase = new CreateCarUseCase(carsRepository);
    const createCarController = new CreateCarController(createCarUseCase);
    return createCarController
}