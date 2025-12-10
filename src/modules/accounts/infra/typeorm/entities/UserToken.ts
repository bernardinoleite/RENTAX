import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User.js";
import { randomUUID as uuidV4 } from "node:crypto";

@Entity("users_token")
class UserToken {

    @PrimaryColumn("uuid")
    id?: string;

    @Column("varchar")
    refresh_token: string;

    @Column("varchar")
    user_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User

    @Column({ type: "timestamp" })
    expires_date: Date;

    @CreateDateColumn({ type: "timestamp", default: "now()" })
    created_at: Date;

    constructor() {
        if (!this.id) this.id = uuidV4()
    }

}


export {
    UserToken
}