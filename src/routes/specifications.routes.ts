import { Router } from "express";

import { createSpecificationController } from "../modules/cars/useCases/createSpecification/index.js";

const specificationsRouter = Router();

specificationsRouter.post("/", async (request, response) => {
    await createSpecificationController.handle(request, response);
})

export {
    specificationsRouter
}