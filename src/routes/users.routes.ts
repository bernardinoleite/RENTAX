import { Router } from "express";
import createUserController from "../modules/accounts/useCases/createUser/index.js";
const usersRoutes = Router();

usersRoutes.post("/", async (request, response) => {
    await createUserController().handle(request, response);
})

usersRoutes.post("/", async (request, response) => {
    await createUserController().handle(request, response);
})
export {
    usersRoutes
}