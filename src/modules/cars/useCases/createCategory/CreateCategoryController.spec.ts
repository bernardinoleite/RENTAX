import request from "supertest";
import { randomUUID as uuidV4 } from "node:crypto";
import { hash } from "bcrypt";

import { app } from "../../../../shared/infra/http/app.js";
import { AppDataSource } from "../../../../shared/infra/typeorm/data-source.js";
import { DataSource } from "typeorm";

let connection: DataSource;

describe("Create Category Controller", () => {
    beforeAll(async () => {
        connection = await AppDataSource.initialize();
        await connection.dropDatabase();
        await connection.runMigrations();

        const id = uuidV4();
        const password = await hash("admin", 8);

        await connection.query(
            `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
       VALUES($1, $2, $3, $4, $5, now(), $6)`,
            [id, "admin", "admin@rentx.com.ao", password, true, "XXXXX"]
        );

    });

    afterAll(async () => {
        // garante que o banco é limpo ao final
        if (connection && connection.isInitialized) {
            await connection.dropDatabase()
            await connection.destroy()
        }
    });

    it("Should be able to create a new category", async () => {
        const responseToken = await request(app).post("/session").send({
            email: "admin@rentx.com.ao",
            password: "admin",
        });

        const { token } = responseToken.body; // pega o token de autenticação

        const response = await request(app)
            .post("/categories")
            .set({
                Authorization: `Bearer ${token}`,
            })
            .send({
                name: "Category supertest",
                description: "Category supertest",
            });

        expect(response.status).toBe(201);
    });

    it("Should not be able to create a new category with same name", async () => {
        const responseToken = await request(app).post("/session").send({
            email: "admin@rentx.com.ao",
            password: "admin",
        });

        const { token } = responseToken.body; // pega o token de autenticação

        const response = await request(app)
            .post("/categories")
            .set({
                Authorization: `Bearer ${token}`,
            })
            .send({
                name: "Category supertest",
                description: "Category supertest",
            });

        expect(response.status).toBe(409);
    });
});
