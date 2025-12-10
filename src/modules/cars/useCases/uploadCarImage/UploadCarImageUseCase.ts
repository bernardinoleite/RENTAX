import { ICarsImagesRepository } from "../../repositories/ICarsImagesRepository.js";
import { ICarsRepository } from "../../repositories/ICarsRepository.js";

interface IRequest {
    car_id: string;
    images_name: string[];
}
class UploadCarImageUseCase {

    constructor(private carsImagesRepository: ICarsImagesRepository) {
    }

    async execute({ car_id, images_name }: IRequest): Promise<void> {
        images_name.map(async (image) => {
            await this.carsImagesRepository.create(car_id, image);
        })
    }

}


export {
    UploadCarImageUseCase
}