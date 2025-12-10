import { Router } from "express";
import createSpecificationController from "../../../../modules/cars/useCases/createSpecification/index.js";
import { ensureAuthenticated } from "../../../../shared/infra/http/middlewares/ensureAuthenticated.js";
import { ensureAdmin } from "../middlewares/ensureAdmin.js";

const specificationsRoutes = Router();
specificationsRoutes.post("/", ensureAuthenticated, ensureAdmin, async (request, response) => {
    await createSpecificationController().handle(request, response);
})

export {
    specificationsRoutes
}