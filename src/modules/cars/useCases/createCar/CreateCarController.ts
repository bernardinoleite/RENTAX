import { Request, Response } from "express";
import { CreateCarUseCase } from "./CreateCarUseCase.js";



class CreateCarController {

    constructor(private createCarUseCase: CreateCarUseCase) {

    }

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, description, daily_rate, license_plate, category_id, fine_amount, brand } = request.body;

        const car = await this.createCarUseCase.execute({ name, description, daily_rate, license_plate, category_id, fine_amount, brand });

        return response.status(201).json(car);
    }
}


export {
    CreateCarController
}