import { CreateRentalUseCase } from "./CreateRentalUseCase.js";
import { Request, Response } from "express";


class CreateRentalController {
    constructor(private createRentalUseCase: CreateRentalUseCase) {

    }

    async handle(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;
        const { car_id, expected_return_date } = request.body;

        const rental = await this.createRentalUseCase.execute({ car_id, expected_return_date, user_id })

        return response.status(201).json(rental)
    }
}

export {
    CreateRentalController
}