import employees from "../../../data/employees";
import {SaleDTO, SaleStatus} from "../../../entities/Sale";
import moment from 'moment';
import randomWords from 'random-words';

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const priceBounds = {
    Nautical: {
        min: 300000,
        max: 3000000
    },
    Motor: {
        min: 20000,
        max: 1000000
    },
    Watches: {
        min: 2000,
        max: 50000
    },
    Aerospace: {
        min: 1000000,
        max: 5000000
    },
    'Baked Goods': {
        min: 1,
        max: 2
    }
}

export default function createMockSales() {

    return employees.reduce((a: SaleDTO[], employee) => {
        const numberOfSales = Math.round(Math.random() * 100)
        // @ts-ignore
        const employeeSales: SaleDTO[] = Array(numberOfSales)
            .fill(null)
            .map((_: any, i) => {
                const { division } = employee
                // @ts-ignore
                const bounds = priceBounds[division]

                const employeeId = employee.id;
                const item = randomWords({ min: 2, max: 3, join: ' '})
                const dayOffset = Math.round(Math.random() * 30)
                const dateOpened = moment().subtract(dayOffset, 'days').toDate()
                const itemCost = getRandomInt(bounds.min, bounds.max)
                const agreedPrice = getRandomInt(itemCost, bounds.max)
                let status = SaleStatus.Complete;
                const statusRn = Math.random()

                if(statusRn > .6 && statusRn < .9) {
                    status = SaleStatus.InProgress
                } else if(statusRn > .9 && statusRn < .95) {
                    status = SaleStatus.Closed
                } else if (statusRn > .95) {
                    status = SaleStatus.AwaitingPayment
                }

                return {
                    employeeId,
                    item,
                    itemCost,
                    agreedPrice,
                    customerName: 'Keith',
                    status,
                    dateOpened,
                    dateClosed: status === SaleStatus.Complete ? moment().toDate() : null
                }
            })

        return [...a, ...employeeSales]
    }, [])
}