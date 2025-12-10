import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory.js";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase.js";

let carsRepository: CarsRepositoryInMemory;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe("List Cars", () => {

    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepository);
    })

    it("Should be able to list all available cars", async () => {

        const car = await carsRepository.create({
            "brand": "Toyota",
            "category_id": "5e710b87-5658-4112-8cf7-15a6f43b5053",
            "daily_rate": 7500,
            "description": "Carro confortável, econômico e ideal para viagens longas.",
            "fine_amount": 1500,
            "license_plate": "LD-46-33-AA",
            "name": "Corolla XEi"
        })

        const cars = await listAvailableCarsUseCase.execute({});

        expect(cars).toEqual([car])
    })

    it("Should be able to list all available cars by brand", async () => {


        const car = await carsRepository.create({
            "brand": "Toyota1",
            "category_id": "1e710b87-5658-4112-8cf7-15a6f43b5053",
            "daily_rate": 7500,
            "description": "Carro confortável, econômico e ideal para viagens longas.",
            "fine_amount": 1500,
            "license_plate": "LD-46-33-AA",
            "name": "Corolla XEi 1"
        })

        const cars = await listAvailableCarsUseCase.execute({
            brand: "Toyota1"
        });

        expect(cars).toEqual([car])

    })

    it("Should be able to list all available cars by name", async () => {


        const car = await carsRepository.create({
            "brand": "Toyota12",
            "category_id": "0e710b87-5658-4112-8cf7-15a6f43b5053",
            "daily_rate": 7500,
            "description": "Carro confortável, econômico e ideal para viagens longas.",
            "fine_amount": 1500,
            "license_plate": "LD-46-33-AA",
            "name": "Coroll2"
        })

        const cars = await listAvailableCarsUseCase.execute({
            name: "Coroll2"
        });

        expect(cars).toEqual([car])

    })


    it("Should be able to list all available cars by category_id", async () => {


        const car = await carsRepository.create({
            "brand": "Toyota128",
            "category_id": "0e710b87-5658-4112-8cf7-15a6f43b5053",
            "daily_rate": 7500,
            "description": "Carro confortável, econômico e ideal para viagens longas.",
            "fine_amount": 1500,
            "license_plate": "LD-46-33-AA",
            "name": "Cosroll2"
        })

        const cars = await listAvailableCarsUseCase.execute({
            category_id: "0e710b87-5658-4112-8cf7-15a6f43b5053"
        });

        expect(cars).toEqual([car]);

    })
})