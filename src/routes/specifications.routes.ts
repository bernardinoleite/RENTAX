import { Router } from "express";

import createSpecificationController from "../modules/cars/useCases/createSpecification/index.js";

const specificationsRoutes = Router();

specificationsRoutes.post("/", async (request, response) => {
    await createSpecificationController().handle(request, response);
})

export {
    specificationsRoutes
}