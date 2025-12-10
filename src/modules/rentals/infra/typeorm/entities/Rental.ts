import { randomUUID as uuidV4 } from "node:crypto";
import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Car } from "../../../../cars/infra/typeorm/entities/Car.js";
@Entity("rentals")
class Rental {
    @PrimaryColumn("uuid")
    id: string;
    @Column("uuid")
    user_id: string;
    @Column("uuid")

    car_id: string;
    
    @ManyToOne(() => Car)
    @JoinColumn({ name: "car_id" })
    car: Car

    @Column({ type: "timestamp", default: "now()" })
    start_date: Date;
    @Column({ type: "timestamp", nullable: true })
    end_date: Date;
    @Column("timestamp")
    expected_return_date: Date;
    @Column({ type: "numeric", nullable: true })
    total: number;
    @CreateDateColumn({ type: "timestamp", default: "now()" })
    created_at: Date;
    @UpdateDateColumn({ type: "timestamp", default: "now()" })
    updated_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export {
    Rental
}