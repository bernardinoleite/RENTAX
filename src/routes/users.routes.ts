import { Router } from "express";
import multer from "multer";
import createUserController from "../modules/accounts/useCases/createUser/index.js";
import updateUserAvatarController from "../modules/accounts/useCases/updateUserAvatar/index.js";
import uploadConfig from "../config/upload.js";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";

const usersRoutes = Router();
const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));
usersRoutes.post("/", async (request, response) => {
    await createUserController().handle(request, response);
})

usersRoutes.post("/", async (request, response) => {
    await createUserController().handle(request, response);
})

usersRoutes.patch("/avatar", ensureAuthenticated, uploadAvatar.single("avatar"), async (request, response) => {
    await updateUserAvatarController().handle(request, response);
})

export {
    usersRoutes
}