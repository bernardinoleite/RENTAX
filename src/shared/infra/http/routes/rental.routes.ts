import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";
import createRentalController from "../../../../modules/rentals/useCases/createRental/index.js";
import devolutionRentalController from "../../../../modules/rentals/useCases/devolutionRental/index.js";

import listRentalByUserController from "../../../../modules/rentals/useCases/listRentalByUser/index.js";
const rentalRoutes = Router();

rentalRoutes.post("/", ensureAuthenticated, async (request, response) => {
    await createRentalController().handle(request, response);
})

rentalRoutes.post("/devolution/:id", ensureAuthenticated, async (request, response) => {
    await devolutionRentalController().handle(request, response);
})

rentalRoutes.get("/user", ensureAuthenticated, async (request, response) => {
    await listRentalByUserController().handle(request, response);
})

export {
    rentalRoutes
}