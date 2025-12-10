import { AppDataSource } from "../data-source.js";
import { randomUUID as uuidV4 } from "node:crypto";
import { hash } from "bcrypt";

async function create() {
    const connection = await AppDataSource.initialize();

    const id = uuidV4();
    const password = await hash("admin", 8);

    await connection.query(
        `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
     VALUES($1, $2, $3, $4, $5, now(), $6)`,
        [id, "admin", "admin@rentx.com.ao", password, true, "XXXXX"]
    );

    await connection.destroy();
    console.log("✅ User Admin created");
}

create().catch((e) => console.log("❌ Error:", e.message));
