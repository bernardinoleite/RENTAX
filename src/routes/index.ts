import { Router } from "express";
import { categoriesRouter } from "./categories.routes.js";
import { specificationsRouter } from "./specifications.routes.js";

const router = Router();


router.use("/categories", categoriesRouter);
router.use("/specifications", specificationsRouter);

export {
    router
}