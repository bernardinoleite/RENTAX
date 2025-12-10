import { randomUUID as uuidV4 } from "node:crypto";
import { Entity, CreateDateColumn, PrimaryColumn, Column } from "typeorm";

@Entity("specifications")
class Specification {

    @PrimaryColumn("uuid")
    id?: string;

    @Column("varchar")
    name: string;

    @Column("varchar")
    description: string;

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    constructor() {
        if (!this.id) this.id = uuidV4();
    }
}

export {
    Specification
}