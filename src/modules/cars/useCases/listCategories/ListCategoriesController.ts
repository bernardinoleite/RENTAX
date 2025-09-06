import type { Request, Response } from "express"
import type { ListCategoriesUseCase } from "./ListCategoriesUseCase.js"


class ListCategoriesController {

    constructor(private listCategoriesUseCase: ListCategoriesUseCase) {
    }

    async handle(request: Request, response: Response): Promise<Response> {
        const categories = await this.listCategoriesUseCase.execute();
        return response.json(categories);
    }
}

export {
    ListCategoriesController
}