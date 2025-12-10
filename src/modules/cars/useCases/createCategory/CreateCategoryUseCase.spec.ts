import { AppError } from "../../../../shared/errors/AppError.js";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory.js"
import { CreateCategoryUseCase } from "./CreateCategoryUseCase.js"

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {

    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
    })

    it("Should be able to create a new category", async () => {
        const category = {
            name: "Category Test",
            description: "Category description test"
        }
        await createCategoryUseCase.execute(category);

        const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);

        expect(categoryCreated).toHaveProperty("id");
    })

    it("Should not be able to create a new category with same name", async () => {
        const category = {
            name: "Category Test",
            description: "Category description test"
        }

        await createCategoryUseCase.execute(category);

        await expect(createCategoryUseCase.execute(category))
            .rejects
            .toEqual(new AppError("Category already exists", 409));
    })
})