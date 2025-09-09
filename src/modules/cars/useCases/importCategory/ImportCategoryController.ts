import type { Request, Response } from "express";
import type { ImportCategoryUseCase } from "./ImportCategoryUseCase.js";

class ImportCategoryController {

    constructor(private importCategoryUseCase: ImportCategoryUseCase) {
    }

    async handle(request: Request, response: Response): Promise<Response> {
        const { file } = request;

        await this.importCategoryUseCase.execute(file);

        return response.status(201).send()
    }
}

export {
    ImportCategoryController
}