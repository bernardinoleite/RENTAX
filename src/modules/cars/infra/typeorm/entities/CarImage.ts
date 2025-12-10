import { randomUUID as uuidV4 } from "node:crypto"

import { CreateDateColumn, Entity, PrimaryColumn, Column } from "typeorm";

@Entity("cars_image")
class CarImage {

    @PrimaryColumn("uuid")
    id?: string;

    @Column("varchar")
    car_id: string;

    @Column("varchar")
    image_name: string;

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export {
    CarImage
}