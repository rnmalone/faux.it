import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

export enum SaleStatus {
    InProgress = 'IN PROGRESS',
    Complete = 'COMPLETE',
    AwaitingPayment = 'AWAITING PAYMENT',
    Closed = 'CLOSED'
}

@Entity()
export default class Sale {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    employeeId: number;

    @Column()
    item: string;

    @Column()
    agreedPrice: number;

    @Column()
    ticketPrice: number;

    @Column()
    customerName: string;

    @Column()
    status: SaleStatus;

    @Column()
    dateOpened: Date;

    @Column({nullable: true})
    dateClosed: Date | null;
}

export type SaleDTO = Pick<Sale, 'id' | 'employeeId' | 'item' | 'agreedPrice' | 'ticketPrice' | 'customerName' | 'status' | 'dateOpened' | 'dateClosed'>
