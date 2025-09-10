import multer from "multer";
import { randomBytes } from "node:crypto";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export default {
    upload(folder: string) {
        console.log(folder);

        return {
            storage: multer.diskStorage({
                destination: resolve(dirname(fileURLToPath(import.meta.url)), "..", "..", folder),
                filename(req, file, callback) {
                    const fileHash = randomBytes(16).toString("hex");
                    const fileName = `${fileHash}-${file.originalname}`;
                    callback(null, fileName);
                },
            }),
        };
    }
}