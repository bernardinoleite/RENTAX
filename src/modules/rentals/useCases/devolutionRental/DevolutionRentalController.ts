import { DevolutionRentalUseCase } from "./DevolutionRentalUseCase.js";
import { Request, Response } from "express";

class DevolutionRentalController {
    constructor(private devolutionRentalUseCase: DevolutionRentalUseCase) {

    }

    async handle(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id
        const id = request.params.id
        const rental = await this.devolutionRentalUseCase.execute({ id, user_id });

        return response.status(200).json(rental);
    }
}


export {
    DevolutionRentalController
}