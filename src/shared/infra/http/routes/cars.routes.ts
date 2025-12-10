import { Router } from "express";
import multer from "multer";
import uploadConfig from "../../../../config/upload.js";
import createCarController from "../../../../modules/cars/useCases/createCar/index.js";
import listAvailableCarsController from "../../../../modules/cars/useCases/listAvailableCars/index.js";
import createCarSpecificationController from "../../../../modules/cars/useCases/createCarSpecification/index.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";
import { ensureAdmin } from "../middlewares/ensureAdmin.js";
import uploadCarImageController from "../../../../modules/cars/useCases/uploadCarImage/index.js";
const carsRoutes = Router();

const upload = multer(uploadConfig.upload("./tmp/cars"));

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, async (request, response) => {
    await createCarController().handle(request, response);
})

carsRoutes.get("/available", async (request, response) => {
    await listAvailableCarsController().handle(request, response);
})

carsRoutes.post("/specifications/:id", ensureAuthenticated, ensureAdmin, async (request, response) => {
    await createCarSpecificationController().handle(request, response);
})

carsRoutes.post("/images/:id", ensureAuthenticated, ensureAdmin, upload.array("images"), async (request, response) => {
    await uploadCarImageController().handle(request, response)
})
export {
    carsRoutes
}