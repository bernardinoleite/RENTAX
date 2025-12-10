import { CarImage } from "../infra/typeorm/entities/CarImage.js";

interface ICarsImagesRepository {

    create(car_id: string, image_name: string): Promise<CarImage>
}


export {
    ICarsImagesRepository
}