import { AppError } from "../../../../shared/errors/AppError.js";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory.js";
import { SpecificationsRepositoryInMemory } from "../../repositories/in-memory/SpecificationsRepositoryInMemory.js";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase.js"

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
describe("Create Car Specification", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory()
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
    })

    it("Should not be able to add a new specification to a now-existent  car", async () => {
        const car_id = "1234";
        const specifications_id = ["5432"]
        expect(createCarSpecificationUseCase.execute({ car_id, specifications_id })).rejects.toEqual(new AppError("Car with id 1234 not found."));
    })


    it("Should be able to add a new specification to the car", async () => {
        const carMock = {
            brand: "Toyota",
            category_id: "a12f8c9d-4b3e-45d9-9f7e-8b2d9d223abc",
            daily_rate: 7500,
            description: "Carro confortável, econômico e ideal para viagens longas.",
            fine_amount: 1500,
            license_plate: "LD-45-32-AA",
            name: "Corolla XEi"
        };

        const car = await carsRepositoryInMemory.create(carMock)

        const specification = await specificationsRepositoryInMemory.create({ name: "Specification name", description: "Description" })
        const specifications_id = [specification.id]
        const specificationCars = await createCarSpecificationUseCase.execute({ car_id: car.id, specifications_id });

        expect(specificationCars).toHaveProperty("specifications")
        expect(specificationCars.specifications.length).toBe(1)

    })

})