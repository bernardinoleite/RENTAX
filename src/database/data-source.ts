process.loadEnvFile(".env")


import { DataSource } from "typeorm";
import { Category } from "../modules/cars/entities/Category.js";
export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.HOST_DB,
    port: Number(process.env.PORT_DB),
    username: process.env.USERNAME_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE,
    synchronize: true,
    logging: false,
    entities: [Category],
    subscribers: [],
    migrations: ["src/database/migrations/*.ts"],
});

