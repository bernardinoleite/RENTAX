import { Router } from "express";
import authenticateUserController from "../../../../modules/accounts/useCases/authenticateUser/index.js";
const authenticateRoutes = Router();

authenticateRoutes.post("/session", async (request, response) => {
    await authenticateUserController().handle(request, response);
})

export {
    authenticateRoutes
}
