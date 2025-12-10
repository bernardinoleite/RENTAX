process.loadEnvFile(".env")

import { DataSource } from "typeorm";
import { Category } from "../../../modules/cars/infra/typeorm/entities/Category.js";
import { Specification } from "../../../modules/cars/infra/typeorm/entities/Specification.js";
import { User } from "../../../modules/accounts/infra/typeorm/entities/User.js";
import { Car } from "../../../modules/cars/infra/typeorm/entities/Car.js";
import { CarImage } from "../../../modules/cars/infra/typeorm/entities/CarImage.js";
import { Rental } from "../../../modules/rentals/infra/typeorm/entities/Rental.js";
import { UserToken } from "../../../modules/accounts/infra/typeorm/entities/UserToken.js";
export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.NODE_ENV === "test" ? "localhost" : process.env.HOST_DB,
    port: 5432,
    username: "leite",
    password: "Sapatogrande",
    database: process.env.NODE_ENV === "test" ? "rentx_test" : "rentx",
    synchronize: true,
    logging: false,
    entities: [Category, Specification, User, Car, CarImage, Rental, UserToken],
    subscribers: [],
    migrations: ["src/shared/infra/typeorm/migrations/*.ts"],
});

