import { randomUUID as uuidV4 } from "node:crypto";
import { Entity, Column, PrimaryColumn, CreateDateColumn } from "typeorm";
@Entity("users")
class User {

    @PrimaryColumn("uuid")
    id?: string;

    @Column("varchar")
    name: string;

    @Column("varchar")
    email: string;

    @Column("varchar")
    password: string;

    @Column("varchar")
    driver_license: string;

    @Column({
        type: "boolean",
        default: false
    })
    isAdmin?: boolean;

    @Column({
        type: "varchar",
        nullable: true
    })
    avatar: string;

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    constructor() {
        if (!this.id) this.id = uuidV4();
    }
}


export { User }