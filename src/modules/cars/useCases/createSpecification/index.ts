import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository.js";
import { CreateSpecificationController } from "./CreateSpecificationController.js";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase.js";

const specificationsRepository = new SpecificationsRepository();
const createSpecificationUseCase = new CreateSpecificationUseCase(specificationsRepository);
const createSpecificationController = new CreateSpecificationController(createSpecificationUseCase);


export {
    createSpecificationController
}