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
    }
]

export default sales;
