import { Request, Response } from "express"
import { ListRentalsByUserUseCase } from "./ListRentalsByUserUseCase.js"
class ListRentalsByUserController {

    constructor(private listRentalsByUserUseCase: ListRentalsByUserUseCase) { }

    async handle(request: Request, response: Response): Promise<Response> {
        const { id: user_id } = request.user

        const rentals = await this.listRentalsByUserUseCase.execute(user_id)
        return response.status(200).json(rentals);
    }

}


export {
    ListRentalsByUserController
}