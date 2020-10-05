import employees from "../../../data/employees";
import {SaleDTO, SaleStatus} from "../../../entities/Sale";
import moment from 'moment';
import randomWords from 'random-words';
import Chance from 'chance';

const chance = new Chance()

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
        max: 100000
    },
    Watches: {
        min: 2000,
        max: 50000
    },
    Aerospace: {
        min: 1000000,
        max: 5000000
    },
    Electrical: {
        min: 1500,
        max: 5000
    }
}

const saleBounds = {
    Nautical: {
        min: 50,
        max: 100
    },
    Motor: {
        min: 200,
        max: 300
    },
    Watches: {
        min: 1000,
        max: 1300
    },
    Aerospace: {
        min: 20,
        max: 30
    },
    Electrical: {
        min: 3000,
        max: 3600
    }
}

const productCategories = {
    Nautical: [
        'Speedboats',
        'Fishing Trawlers',
        'Yachts',
        'Houseboats',
        'Jet ski',
        'Catamaran'
    ],
    Motor: [
        'Hatchback',
        'Motorcycle',
        'Executive Saloon',
        'Coupe',
        'SUV',
        'Van'
    ],
    Aerospace: [
        'Helicopters',
        'Gliders',
        'Plane'
    ],
    Watches: [
        'Analog',
        'Digital',
        'Chronograph',
        'Diving',
        'Mechanical',
        'Quartz'
    ],
    'Baked Goods': [
        'Steak Bake',
        'Sausage Roll',
        'Cinnamon Roll',
        'Chicken and mushroom pie'
    ],
    Electrical: [
        'TVs',
        'Sound Systems',
        'Fridges',
        'Microwaves',
        'Laptops',
        'Washing Machines'
    ]
}

const leadSources = [
    'Website',
    'Store',
    'Magazine',
    'TV',
    'Radio',
    'Newspaper',
    'Telephone'
]

const repeatCustomerBuffer: string[] = []

export default function createMockSales() {

    return employees.reduce((a: SaleDTO[], employee) => {
        // @ts-ignore
        const numberOfSales = getRandomInt(saleBounds[employee.division].min, saleBounds[employee.division].max)
        // @ts-ignore
        const employeeSales: SaleDTO[] = Array(numberOfSales)
            .fill(null)
            .map((_: null, i) => {
                const {division} = employee
                // @ts-ignore
                const bounds = priceBounds[division]

                const employeeId = employee.id;
                const item = randomWords({min: 2, max: 3, join: ' '})
                const dayOffset = Math.round(Math.random() * 365 * 2)
                const dateOpened = moment().subtract(dayOffset, 'days').toISOString()
                const itemCost = getRandomInt(bounds.min, bounds.max)
                const agreedPrice = getRandomInt(itemCost, itemCost * 1.05)
                let status = SaleStatus.Complete;
                const statusRn = Math.random()

                if (statusRn > .4 && statusRn < .9) {
                    status = SaleStatus.Closed
                } else if (statusRn > .9 && statusRn < .95) {
                    status = SaleStatus.InProgress
                } else if (statusRn > .95) {
                    status = SaleStatus.AwaitingPayment
                }

                const repeatCustomer: boolean = Math.random() > .15
                let customerName = chance.name()
                if (Math.random() > .15 && repeatCustomerBuffer.length) {
                    customerName = repeatCustomerBuffer[getRandomInt(0, repeatCustomerBuffer.length - 1)]
                } else if (repeatCustomer) repeatCustomerBuffer.push(customerName)

                return {
                    employeeId,
                    item,
                    itemCost,
                    agreedPrice,
                    customerAge: getRandomInt(18, 80),
                    daysItemOnSale: getRandomInt(0, 100),
                    customerName,
                    status,
                    leadSource: leadSources[getRandomInt(0, leadSources.length - 1)],
                    customerGender: chance.gender(),
                    // @ts-ignore
                    productCategory: productCategories[division][getRandomInt(0, productCategories[division].length - 1)],
                    division,
                    dateOpened,
                    dateClosed: (status === SaleStatus.Complete || status === SaleStatus.Closed) ? moment(dateOpened).add(getRandomInt(1, 5), 'days').toISOString() : null
                }
            })

        return [...a, ...employeeSales]
    }, [])
}