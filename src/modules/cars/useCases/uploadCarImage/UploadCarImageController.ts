import { Request, Response } from "express";
import { UploadCarImageUseCase } from "./UploadCarImageUseCase.js";

interface IFiles {
    filename: string
}
class UploadCarImageController {
    constructor(private uploadCarImageUseCase: UploadCarImageUseCase) {

    }

    async handle(request: Request, response: Response): Promise<Response> {

        const car_id = request.params.id
        const images = request.files as IFiles[];

        const images_name = images.map((file) => file.filename)
        await this.uploadCarImageUseCase.execute({ car_id, images_name })

        return response.status(201).send()
    }
}


export {


    UploadCarImageController
}