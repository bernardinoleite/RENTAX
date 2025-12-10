import { Router } from "express";
import { categoriesRoutes } from "./categories.routes.js";
import { specificationsRoutes } from "./specifications.routes.js";
import { usersRoutes } from "./users.routes.js";
import { authenticateRoutes } from "./authenticate.routes.js";
import { carsRoutes } from "./cars.routes.js";
import { rentalRoutes } from "./rental.routes.js";

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/users", usersRoutes);
router.use("/cars", carsRoutes);
router.use("/rentals", rentalRoutes);

router.use(authenticateRoutes);

export {
    router
}