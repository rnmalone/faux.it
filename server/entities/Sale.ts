import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import Employee from "./Employee";

export enum SaleStatus {
    InProgress = 'IN_PROGRESS',
    Complete = 'COMPLETE',
    AwaitingPayment = 'AWAITING_PAYMENT',
    Closed = 'CLOSED'
}

@Entity()
export default class Sale {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Employee, (employee: Employee) => employee.id)
    employee: number;

    @Column()
    item: string;

    @Column()
    agreedPrice: number;

    @Column()
    itemCost: number;

    @Column()
    division: string;

    @Column()
    customerName: string;

    @Column()
    customerGender: string;

    @Column()
    customerAge: number;

    @Column()
    productCategory: string;

    @Column()
    leadSource: string;

    @Column()
    daysItemOnSale: number;

    @Column()
    status: SaleStatus;

    @Column()
    dateOpened: Date;

    @Column({nullable: true})
    dateClosed: Date | null;
}

export type SaleDTOFields = Pick<Sale, 'id' | 'division' | 'employee' | 'item' | 'agreedPrice' | 'itemCost' | 'customerName' | 'status' | 'dateOpened' | 'dateClosed'>

export interface SaleDTO extends SaleDTOFields {
    employeeId: string;
}