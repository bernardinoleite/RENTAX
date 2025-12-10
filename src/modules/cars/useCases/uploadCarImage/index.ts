import { CarsImagesRepository } from "../../infra/typeorm/repositories/CarsImagesRepository.js";

import { UploadCarImageUseCase } from "./UploadCarImageUseCase.js";

import { UploadCarImageController } from "./UploadCarImageController.js";

export default (): UploadCarImageController => {
    const carsImagesRepository = new CarsImagesRepository();
    const uploadCarImageUseCase = new UploadCarImageUseCase(carsImagesRepository)
    const uploadCarImageController = new UploadCarImageController(uploadCarImageUseCase);
    return uploadCarImageController;
}