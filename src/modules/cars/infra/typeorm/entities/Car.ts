import { Entity, Column, PrimaryColumn, CreateDateColumn, JoinColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm"
import { randomUUID as uuidV4 } from "node:crypto"
import { Category } from "./Category.js";
import { Specification } from "./Specification.js";

@Entity("cars")
class Car {

    @PrimaryColumn("uuid")
    id: string;
    @Column("varchar")
    name: string;
    @Column("varchar")
    description: string;
    @Column("numeric")
    daily_rate: number;
    @Column({ type: "boolean", default: true })
    available: boolean;
    @Column("varchar")
    license_plate: string;
    @Column("uuid")
    category_id: string;
    @JoinColumn({ name: "category_id" })
    @ManyToOne(() => Category)
    category: Category;
    @ManyToMany(() => Specification)
    @JoinTable({
        name: "specifications_cars",
        joinColumns: [{ name: "car_id" }],
        inverseJoinColumns: [{ name: "specification_id" }]
    })
    specifications: Specification[];
    @Column("numeric")
    fine_amount: number;
    @Column("varchar")
    brand: string;
    @CreateDateColumn({ type: "timestamp", default: "now()" })
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
            this.available = true;
        }
    }
}


export {
    Car
}