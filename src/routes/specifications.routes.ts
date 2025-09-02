import { Router } from "express";
import { CreateSpecificationService } from "../modules/cars/services/CreateSpecificationService.js";
import { SpecificationsRepository } from "../modules/cars/repositories/SpecificationsRepository.js";

const specificationsRouter = Router();
const specificationsRepository = new SpecificationsRepository();
specificationsRouter.post("/", (request, response) => {

    const { name, description } = request.body;
    const createSpecificationService = new CreateSpecificationService(specificationsRepository);

    createSpecificationService.execute({ name, description });
    return response.status(201).send();
})

export {
    specificationsRouter
}