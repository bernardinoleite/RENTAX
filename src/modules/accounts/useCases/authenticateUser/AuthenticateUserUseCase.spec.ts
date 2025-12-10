import { AppError } from "../../../../shared/errors/AppError.js";
import { ICreateUserDTO } from "../../dtos/ICreateUsersDTO.js";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory.js";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase.js";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase.js"

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {

    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory()
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory)
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
    })

    it("Should be able to authenticate an user ", async () => {
        const user: ICreateUserDTO = {
            driver_license: "000123",
            email: "user@test.com",
            name: "user name",
            password: "1234",
        }
        await createUserUseCase.execute(user);
        const result = await authenticateUserUseCase.execute({ email: user.email, password: user.password });

        expect(result).toHaveProperty("token");
    })

    it("should not be able to authenticate nonexistent user", async () => {

        await expect(authenticateUserUseCase.execute({ email: "user1@test.com", password: "1234" })
        ).rejects.toEqual(new AppError("Email or password incorrect"));

    })

    it("Should be able to authenticate with incorrect password ", async () => {
        const user: ICreateUserDTO = {
            driver_license: "000123",
            email: "user@test.com",
            name: "user name",
            password: "1234",
        }

        await createUserUseCase.execute(user);
        await expect(
            authenticateUserUseCase.execute({ email: user.email, password: "1111" })
        )
            .rejects
            .toEqual(new AppError("Email or password incorrect"));
    })
})