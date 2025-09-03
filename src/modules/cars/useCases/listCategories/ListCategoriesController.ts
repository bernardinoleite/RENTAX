import type { Request, Response } from "express"
import type { ListCategoriesUseCase } from "./ListCategoriesUseCase.js"


class ListCategoriesController {

    constructor(private listCategoriesUseCase: ListCategoriesUseCase) {

    }

    handle(request: Request, response: Response): Response {
        const categories = this.listCategoriesUseCase.execute();
        return response.json(categories);
    }
}



export {
    ListCategoriesController
}