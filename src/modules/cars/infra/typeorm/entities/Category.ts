import { Entity, Column, CreateDateColumn, PrimaryColumn } from "typeorm";
import { randomUUID as uuidV4 } from "node:crypto";

@Entity("categories")
class Category {
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
    Category
}