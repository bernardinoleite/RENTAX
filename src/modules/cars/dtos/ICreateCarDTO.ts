import { Specification } from "../infra/typeorm/entities/Specification.js";

interface ICreateCarDTO {
    name: string;
    description: string;
    daily_rate: number;
    license_plate: string;
    category_id: string;
    fine_amount: number;
    brand: string;
    specifications?: Specification[];
    id?: string;
}

export {
    ICreateCarDTO
}