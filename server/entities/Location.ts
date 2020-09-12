import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import Employee from "./Employee";

@Entity()
export default class Location {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    address: string;

    @Column()
    countryName: string;

    @Column()
    countryCode: string;

    @OneToMany(() => Employee, employee => employee.locationId)
    employees: Employee[]
}

export type LocationDTO = Pick<Location, 'id' | 'address' | 'countryName' | 'countryCode'>
