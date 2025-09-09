import { CreateUserUseCase } from "./CreateUserUseCase.js";
import { Request, Response } from "express";


class CreateUserController {


    constructor(private createUserUseCase: CreateUserUseCase) {

    }

    async handle(request: Request, response: Response): Promise<Response> {

        const { name, email, password, driver_license } = request.body;

        await this.createUserUseCase.execute({
            name,
            email,
            password,
            driver_license
        });

        return response.status(201).send();
    }
}


export {
    CreateUserController
}