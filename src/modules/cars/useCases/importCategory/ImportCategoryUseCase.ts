import fs from "node:fs";
import { createInterface } from "node:readline";
import type { ICategoriesRepository } from "../../repositories/ICategoriesRepository.js";

class ImportCategoryUseCase {

    constructor(private categoriesRepository: ICategoriesRepository) {

    }

    async loadCategories(file: Express.Multer.File) {

        return (async function* readCsvLines() {
            const stream = fs.createReadStream(file.path);
            const rl = createInterface({
                input: stream,
                crlfDelay: Infinity
            })
            stream.on("error", (err) => {
                throw new Error(`Error while reading file: ${err.message}`);
            });
            for await (const line of rl) {
                if (!line.trim()) continue;
                yield line.split(",");
            }
            fs.promises.unlink(file.path);
        })()

    }

    async execute(file: Express.Multer.File) {
        const categories = await this.loadCategories(file)
        for await (const line of categories) {
            const [name, description] = line;
            if (!name) continue;
            const categoryAlreadExists = await this.categoriesRepository.findByName(name);
            if (!categoryAlreadExists) {
                await this.categoriesRepository.create({ name, description });
            }
        }
    }
}

export {
    ImportCategoryUseCase
}