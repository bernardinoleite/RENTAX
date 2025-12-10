import type { Category } from "../infra/typeorm/entities/Category.js";

interface ICreateCategoryDTO {
    name: string;
    description: string;
}

interface ICategoriesRepository {
    findByName(name: string): Promise<Category>;
    list(): Promise<Category[]>;
    create({ name, description }: ICreateCategoryDTO): Promise<void>;
}

export type { ICategoriesRepository, ICreateCategoryDTO };