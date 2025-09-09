import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository.js";
import { CreateSpecificationController } from "./CreateSpecificationController.js";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase.js";
export default (): CreateSpecificationController => {
    const specificationsRepository = new SpecificationsRepository();
    const createSpecificationUseCase = new CreateSpecificationUseCase(specificationsRepository);
    const createSpecificationController = new CreateSpecificationController(createSpecificationUseCase);
    return createSpecificationController
}


