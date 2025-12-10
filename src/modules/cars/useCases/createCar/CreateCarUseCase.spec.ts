import { AppError } from "../../../../shared/errors/AppError.js";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory.js";
import { CreateCarUseCase } from "./CreateCarUseCase.js"

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;
describe("Create Car", () => {

    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepository);
    })

    it("Should be able to create a new Car", async () => {
        const carMock = {
            brand: "Toyota",
            category_id: "a12f8c9d-4b3e-45d9-9f7e-8b2d9d223abc",
            daily_rate: 7500,
            description: "Carro confortável, econômico e ideal para viagens longas.",
            fine_amount: 1500,
            license_plate: "LD-45-32-AA",
            name: "Corolla XEi"
        };


        const car = await createCarUseCase.execute(carMock);

        expect(car).toHaveProperty("id");
    })


    it("Should not be able to create a new car with exists license plate", async () => {

        const carMock = {
            brand: "Toyota",
            category_id: "a12f8c9d-4b3e-45d9-9f7e-8b2d9d223abc",
            daily_rate: 7500,
            description: "Carro confortável, econômico e ideal para viagens longas.",
            fine_amount: 1500,
            license_plate: "HL-45-32-AA",
            name: "Corolla XEi"
        };
        const carMock2 = {
            brand: "Toyota",
            category_id: "a12f8c9d-4b3e-45d9-9f7e-8b2d9d223abc",
            daily_rate: 7500,
            description: "Carro confortável, econômico e ideal para viagens longas.",
            fine_amount: 1500,
            license_plate: "HL-45-32-AA",
            name: "Corolla XEi 2"
        };

        await createCarUseCase.execute(carMock);

        await expect(createCarUseCase.execute(carMock2)
        ).rejects.toEqual(new AppError("Car already exists", 409));
    })

    it("should be able to create a new car with available true by default", async () => {
        const carMock = {
            brand: "Toyota",
            category_id: "a12f8c9d-4b3e-45d9-9f7e-8b2d9d223abc",
            daily_rate: 7500,
            description: "Carro confortável, econômico e ideal para viagens longas.",
            fine_amount: 1500,
            license_plate: "HL-43-32-AA",
            name: "Corolla XEi 1"
        };

        const car = await createCarUseCase.execute(carMock);
        expect(car.available).toBe(true);
    })
})