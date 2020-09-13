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
    }
]

export default sales;
