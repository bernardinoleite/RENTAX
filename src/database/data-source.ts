import { DataSource } from "typeorm";
import { Category } from "../modules/cars/entities/Category.js";
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "leite",
    password: "Sapatogrande",
    database: "rentx",
    synchronize: true,
    logging: false,
    entities: [Category],
    subscribers: [],
    migrations: ["src/database/migrations/*.ts"],
});

