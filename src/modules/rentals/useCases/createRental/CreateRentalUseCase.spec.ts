import dayjs from "dayjs";
import { AppError } from "../../../../shared/errors/AppError.js";
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory.js";
import { IRentalsRepository } from "../../repositories/IRentalsRepository.js";
import { CreateRentalUseCase } from "./CreateRentalUseCase.js"
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider.js";
import { ICarsRepository } from "../../../cars/repositories/ICarsRepository.js";
import { CarsRepositoryInMemory } from "../../../cars/repositories/in-memory/CarsRepositoryInMemory.js";

let createRentalUseCase: CreateRentalUseCase;
let dayjsDateProvider: DayjsDateProvider;
let carsRepository: ICarsRepository;
let rentalsRepository: IRentalsRepository;

// Corrigido: adiciona 1 dia inteiro (24h garantidas, sem risco de timezone quebrar)
const dayAdd24Hours = dayjs().utc().add(1, "day").toDate();

describe("Create Rental", () => {
    beforeEach(() => {
        rentalsRepository = new RentalsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        carsRepository = new CarsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepository,
            dayjsDateProvider,
            carsRepository
        );
    });

    it("Should be able to create a new rental", async () => {
        const car = await carsRepository.create({
            name: "test",
            description: "test",
            brand: "test",
            daily_rate: 111,
            fine_amount: 11,
            license_plate: "test",
            category_id: "12345"
        });

        const rental = await createRentalUseCase.execute({
            user_id: "11111",
            car_id: car.id,
            expected_return_date: dayAdd24Hours
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });
    it("Should not be able to create a new rental if there is another open to the same user", async () => {
        const car1 = await carsRepository.create({
            name: "Car1",
            description: "Car1 desc",
            brand: "Brand1",
            daily_rate: 100,
            fine_amount: 40,
            license_plate: "TEST-1111",
            category_id: "category"
        });

        const car2 = await carsRepository.create({
            name: "Car2",
            description: "Car2 desc",
            brand: "Brand2",
            daily_rate: 120,
            fine_amount: 50,
            license_plate: "TEST-2222",
            category_id: "category"
        });

        await createRentalUseCase.execute({
            user_id: "11111",
            car_id: car1.id,
            expected_return_date: dayAdd24Hours
        });

        await expect(
            createRentalUseCase.execute({
                user_id: "11111",
                car_id: car2.id,
                expected_return_date: dayAdd24Hours
            })
        ).rejects.toEqual(new AppError("Car is unavailable"));
    });

    it("Should not be able to create a new rental if there is another open to the same car", async () => {
        const car = await carsRepository.create({
            name: "Car3",
            description: "Car3 desc",
            brand: "Brand3",
            daily_rate: 110,
            fine_amount: 30,
            license_plate: "TEST-3333",
            category_id: "category"
        });

        await createRentalUseCase.execute({
            user_id: "11111",
            car_id: car.id,
            expected_return_date: dayAdd24Hours
        });

        await expect(
            createRentalUseCase.execute({
                user_id: "193",
                car_id: car.id,
                expected_return_date: dayAdd24Hours
            })
        ).rejects.toEqual(new AppError("Car is unavailable"));
    });


    it("Should not be able to create a new rental with invalid time", async () => {
        await expect(
            createRentalUseCase.execute({
                user_id: "11111",
                car_id: "121212",
                expected_return_date: dayjs().toDate()
            })
        ).rejects.toEqual(new AppError("Invalid return time. Minimum rental time is 24 hours"));
    });
});
