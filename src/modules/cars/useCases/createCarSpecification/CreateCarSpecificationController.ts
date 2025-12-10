import { Request, Response } from "express"
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase.js"

class CreateCarSpecificationController {

    constructor(private createCarSpecificationUseCase: CreateCarSpecificationUseCase) { }

    async handle(request: Request, response: Response): Promise<Response> {

        const { id } = request.params
        const { specifications_id } = request.body;
        const cars = await this.createCarSpecificationUseCase.execute({ car_id: id, specifications_id })

        return response.json(cars)
    }

}

export {
    CreateCarSpecificationController
}