import { randomUUID as uuidV4 } from "node:crypto";


class Category {

    id?: string;
    name: string;
    description: string;
    created_at: Date;

    constructor() {
        if (!this.id) this.id = uuidV4()
    }

}


export {
    Category
}