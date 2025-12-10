import { Request, Response } from "express";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase.js";



class ListAvailableCarsController {

    constructor(private listAvailableCarsUseCase: ListAvailableCarsUseCase) {

    }

    async handle(request: Request, response: Response): Promise<Response> {
        const { brand, category_id, name } = request.query;

        const cars = await this.listAvailableCarsUseCase.execute({ brand: brand as string, category_id: category_id as string, name: name as string })

        return response.status(200).json(cars)
    }
}


export {
    ListAvailableCarsController
}