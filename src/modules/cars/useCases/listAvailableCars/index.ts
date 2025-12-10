import { CarsRepository } from "../../infra/typeorm/repositories/CarsRepository.js";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase.js";
import { ListAvailableCarsController } from "./ListAvailableCarsController.js";

export default (): ListAvailableCarsController => {
    const carsRepository = new CarsRepository();
    const listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepository);
    const listAvailableCarsController = new ListAvailableCarsController(listAvailableCarsUseCase)
    return listAvailableCarsController;
}