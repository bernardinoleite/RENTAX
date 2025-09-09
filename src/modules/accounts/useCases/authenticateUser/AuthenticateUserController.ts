import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase.js";
import { Request, Response } from "express";

class AuthenticateUserController {

    constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {

    }

    async handle(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;

        const token = await this.authenticateUserUseCase.execute({ email, password });

        return response.status(200).json(token);
    }
}


export {
    AuthenticateUserController
}