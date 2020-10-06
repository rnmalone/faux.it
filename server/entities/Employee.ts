import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import Sale from "./Sale";

@Entity()
export default class Employee {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    jobTitle: string;

    @Column()
    division: string;

    @Column()
    salary: number;

    @Column()
    commissionRate: number

    @Column()
    joinDate: Date;

    @Column()
    bannerImageUrl: string;

    @Column()
    profileImageUrl: string;

    @Column()
    email: string;

    @Column()
    locationId: number;

    @OneToMany(() => Sale, (sale: Sale) => sale.employee)
    sales: Sale[];
}

export type EmployeeDTO = Pick<Employee, 'id' | 'firstName' | 'lastName' | 'jobTitle' | 'division' | 'salary' | 'commissionRate' | 'joinDate' | 'profileImageUrl' | 'bannerImageUrl' | 'email' | 'locationId'>
