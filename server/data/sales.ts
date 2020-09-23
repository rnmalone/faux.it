import {SaleDTO, SaleStatus} from "../entities/Sale";

const sales: SaleDTO[] = [
    {
        id: 1,
        employeeId: 1,
        item: 'Sea Empress',
        agreedPrice: 9750000,
        itemCost: 10000000,
        customerName: 'Gaz Higgins',
        status: SaleStatus.Complete,
        dateOpened: new Date(),
        dateClosed: new Date(),
        division: 'Nautical'
    },
    {
        id: 2,
        employeeId: 1,
        item: 'Prestige - 680',
        agreedPrice: 1600000,
        itemCost: 1607500,
        customerName: 'Keith',
        status: SaleStatus.InProgress,
        dateOpened: new Date(),
        dateClosed: null,
        division: 'Nautical'
    },
    {
        id: 3,
        employeeId: 1,
        item: 'Jolly Rodger',
        agreedPrice: 9500000,
        itemCost: 9600000,
        customerName: 'Cpt. Hook',
        status: SaleStatus.Complete,
        dateOpened: new Date(),
        dateClosed: null,
        division: 'Nautical'
    },
    {
        id: 4,
        employeeId: 1,
        item: 'Orca',
        agreedPrice: 100000,
        itemCost: 100000,
        customerName: 'Quint',
        status: SaleStatus.Complete,
        dateOpened: new Date(),
        dateClosed: null,
        division: 'Nautical'
    },
    {
        id: 5,
        employeeId: 1,
        item: 'Sea Shanty 2',
        agreedPrice: 100000,
        itemCost: 105000,
        customerName: 'Sailor Guy',
        status: SaleStatus.Closed,
        dateOpened: new Date(),
        dateClosed: null,
        division: 'Nautical'
    },
    {
        id: 6,
        employeeId: 1,
        item: 'Mega JetSki 5000 spin dry',
        agreedPrice: 100000,
        itemCost: 105000,
        customerName: 'Mickey McMacer',
        status: SaleStatus.Closed,
        dateOpened: new Date(),
        dateClosed: null,
        division: 'Nautical'
    },
    {
        id: 7,
        employeeId: 2,
        item: 'Raft',
        agreedPrice: 10,
        itemCost: 10,
        customerName: 'Chuck Noland',
        status: SaleStatus.Complete,
        dateOpened: new Date(),
        dateClosed: new Date(),
        division: 'Nautical'
    },
    {
        id: 8,
        employeeId: 2,
        item: 'Maersk Alabama',
        agreedPrice: 100000000,
        itemCost: 105000000,
        customerName: 'Cpt Philips',
        status: SaleStatus.Complete,
        dateOpened: new Date(),
        dateClosed: new Date(),
        division: 'Nautical'
    },
    {
        id: 9,
        employeeId: 2,
        item: 'Titanic',
        agreedPrice: 170000000,
        itemCost: 170000000,
        customerName: 'Rose',
        status: SaleStatus.Complete,
        dateOpened: new Date(),
        dateClosed: new Date(),
        division: 'Nautical'
    },
    {
        id: 10,
        employeeId: 2,
        item: 'Boaty McBoatface',
        agreedPrice: 170000000,
        itemCost: 170000000,
        customerName: 'Atlantic Research',
        status: SaleStatus.Complete,
        dateOpened: new Date(),
        dateClosed: new Date(),
        division: 'Nautical'
    },
    {
        id: 11,
        employeeId: 2,
        item: 'Water Bird',
        agreedPrice: 120000,
        itemCost: 123000,
        customerName: 'Mikkel Spikken',
        status: SaleStatus.AwaitingPayment,
        dateOpened: new Date(),
        dateClosed: null,
        division: 'Nautical'
    },
    {
        id: 13,
        employeeId: 2,
        item: 'The Old Ragdoll',
        agreedPrice: 278000,
        itemCost: 285000,
        customerName: 'Rosie and Jim',
        status: SaleStatus.Complete,
        dateOpened: new Date(),
        dateClosed: new Date(),
        division: 'Nautical'
    },
    {
        id: 21,
        employeeId: 4,
        item: 'Ferarri 458 Italia',
        agreedPrice: 212000,
        itemCost: 220000,
        customerName: 'James May',
        status: SaleStatus.Complete,
        dateOpened: new Date(),
        dateClosed: new Date(),
        division: 'Motor'
    },
]

export default sales;
