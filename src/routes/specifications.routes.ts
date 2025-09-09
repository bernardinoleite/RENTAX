import { Router } from "express";
import createSpecificationController from "../modules/cars/useCases/createSpecification/index.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";

const specificationsRoutes = Router();
specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post("/", async (request, response) => {
    await createSpecificationController().handle(request, response);
})

export {
    specificationsRoutes
}