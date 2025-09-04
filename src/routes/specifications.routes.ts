import { Router } from "express";

import { CreateSpecificationService } from "../modules/cars/services/CreateSpecificationService.js";
import { SpecificationsRepository } from "../modules/cars/repositories/implementations/SpecificationsRepository.js";
import { createSpecificationController } from "../modules/cars/useCases/createSpecification/index.js";

const specificationsRouter = Router();

const specificationsRepository = new SpecificationsRepository();

specificationsRouter.post("/", (request, response) => {
    createSpecificationController.handle(request, response);
})

export {
    specificationsRouter
}