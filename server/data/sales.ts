import {SaleDTO, SaleStatus} from "../entities/Sale";

const sales: SaleDTO[] = [
    {
        id: 1,
        employeeId: 1,
        item: 'Sea Empress',
        agreedPrice: 9750000,
        ticketPrice: 10000000,
        customerName: 'Gaz Higgins',
        status: SaleStatus.Complete,
        dateOpened: new Date(),
        dateClosed: new Date()
    },
    {
        id: 2,
        employeeId: 1,
        item: 'Prestige - 680',
        agreedPrice: 1600000,
        ticketPrice: 1607500,
        customerName: 'Keith',
        status: SaleStatus.InProgress,
        dateOpened: new Date(),
        dateClosed: null
    },
    {
        id: 3,
        employeeId: 1,
        item: 'Jolly Rodger',
        agreedPrice: 9500000,
        ticketPrice: 9600000,
        customerName: 'Cpt. Hook',
        status: SaleStatus.Complete,
        dateOpened: new Date(),
        dateClosed: null
    },
    {
        id: 4,
        employeeId: 1,
        item: 'Orca',
        agreedPrice: 100000,
        ticketPrice: 100000,
        customerName: 'Quint',
        status: SaleStatus.Complete,
        dateOpened: new Date(),
        dateClosed: null
    },
    {
        id: 5,
        employeeId: 1,
        item: 'Sea Shanty 2',
        agreedPrice: 100000,
        ticketPrice: 105000,
        customerName: 'Sailor Guy',
        status: SaleStatus.Closed,
        dateOpened: new Date(),
        dateClosed: null
    },
    {
        id: 6,
        employeeId: 1,
        item: 'Mega JetSki 5000 spin dry',
        agreedPrice: 100000,
        ticketPrice: 105000,
        customerName: 'Mickey McMacer',
        status: SaleStatus.Closed,
        dateOpened: new Date(),
        dateClosed: null
    },
    {
        id: 7,
        employeeId: 2,
        item: 'Raft',
        agreedPrice: 10,
        ticketPrice: 10,
        customerName: 'Chuck Noland',
        status: SaleStatus.Complete,
        dateOpened: new Date(),
        dateClosed: new Date()
    },
    {
        id: 8,
        employeeId: 2,
        item: 'Maersk Alabama',
        agreedPrice: 100000000,
        ticketPrice: 105000000,
        customerName: 'Cpt Philips',
        status: SaleStatus.Complete,
        dateOpened: new Date(),
        dateClosed: new Date()
    },
    {
        id: 9,
        employeeId: 2,
        item: 'Titanic',
        agreedPrice: 170000000,
        ticketPrice: 170000000,
        customerName: 'Rose',
        status: SaleStatus.Complete,
        dateOpened: new Date(),
        dateClosed: new Date()
    },
    {
        id: 10,
        employeeId: 2,
        item: 'Boaty McBoatface',
        agreedPrice: 170000000,
        ticketPrice: 170000000,
        customerName: 'Atlantic Research',
        status: SaleStatus.Complete,
        dateOpened: new Date(),
        dateClosed: new Date()
    },
    {
        id: 11,
        employeeId: 2,
        item: 'Water Bird',
        agreedPrice: 120000,
        ticketPrice: 123000,
        customerName: 'Mikkel Spikken',
        status: SaleStatus.AwaitingPayment,
        dateOpened: new Date(),
        dateClosed: null
    },
    {
        id: 12,
        employeeId: 2,
        item: 'Grand Mister',
        agreedPrice: 450000,
        ticketPrice: 450000,
        customerName: 'Lucinda Jo',
        status: SaleStatus.AwaitingPayment,
        dateOpened: new Date(),
        dateClosed: null
    },
    {
        id: 13,
        employeeId: 2,
        item: 'The Old Ragdoll',
        agreedPrice: 278000,
        ticketPrice: 285000,
        customerName: 'Rosie and Jim',
        status: SaleStatus.Complete,
        dateOpened: new Date(),
        dateClosed: new Date()
    },
    {
        id: 14,
        employeeId: 3,
        item: 'F-17',
        agreedPrice: 37000000,
        ticketPrice: 37000000,
        customerName: 'Mr McTrustworthy',
        status: SaleStatus.Closed,
        dateOpened: new Date(),
        dateClosed: new Date()
    },
    {
        id: 15,
        employeeId: 3,
        item: 'Millenium Falcon',
        agreedPrice: 10000,
        ticketPrice: 10000,
        customerName: 'Han Solo',
        status: SaleStatus.Complete,
        dateOpened: new Date(),
        dateClosed: new Date()
    },
    {
        id: 16,
        employeeId: 3,
        item: 'Concorde',
        agreedPrice: 100000,
        ticketPrice: 100000,
        customerName: 'Air France',
        status: SaleStatus.Complete,
        dateOpened: new Date(),
        dateClosed: new Date()
    },
    {
        id: 17,
        employeeId: 3,
        item: 'Concorde',
        agreedPrice: 1000000,
        ticketPrice: 1000000,
        customerName: 'Air France',
        status: SaleStatus.Complete,
        dateOpened: new Date(),
        dateClosed: new Date()
    },
    {
        id: 18,
        employeeId: 4,
        item: 'Dalorean DMC',
        agreedPrice: 100000,
        ticketPrice: 100000,
        customerName: 'Weird bloke',
        status: SaleStatus.Complete,
        dateOpened: new Date(),
        dateClosed: new Date()
    },
    {
        id: 19,
        employeeId: 4,
        item: 'Vauxhaul Carlton',
        agreedPrice: 958000,
        ticketPrice: 100000,
        customerName: 'David McDavey',
        status: SaleStatus.Complete,
        dateOpened: new Date(),
        dateClosed: new Date()
    },
    {
        id: 20,
        employeeId: 4,
        item: 'Vauxhaul Corsa',
        agreedPrice: 950,
        ticketPrice: 1050,
        customerName: 'Ste Jones',
        status: SaleStatus.Complete,
        dateOpened: new Date(),
        dateClosed: new Date()
    },
    {
        id: 21,
        employeeId: 4,
        item: 'Ferarri 458 Italia',
        agreedPrice: 212000,
        ticketPrice: 220000,
        customerName: 'James MAy',
        status: SaleStatus.Complete,
        dateOpened: new Date(),
        dateClosed: new Date()
    },
]

export default sales;
