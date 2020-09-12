import {EmployeeDTO} from "../entities/Employee";

const employees: EmployeeDTO[] = [
    {
        id: 1,
        firstName: 'Stourton',
        lastName: 'Montgomery',
        jobTitle: 'Senior Sales Executive',
        division: 'Nautical',
        salary: 200000,
        commissionRate: 2,
        email: 'Stourton.montgomery@faux.it',
        joinDate: new Date(),
        imageUrl: '',
        locationId: 1
    },
    {
        id: 2,
        firstName: 'Ophelia',
        lastName: 'Drayton-Clerk',
        jobTitle: 'Senior Sales Executive',
        division: 'Nautical',
        salary: 200000,
        commissionRate: 2,
        email: 'Ophelia.draytonclerk@faux.it',
        joinDate: new Date(),
        imageUrl: '',
        locationId: 1
    },
    {
        id: 3,
        firstName: 'Contstantine',
        lastName: 'Highbury',
        jobTitle: 'Sales Executive',
        division: 'Aereospace',
        salary: 300000,
        commissionRate: 1.5,
        email: 'Contstantine.Highbury@faux.it',
        joinDate: new Date(),
        imageUrl: '',
        locationId: 1
    },
    {
        id: 4,
        firstName: 'Maximillian',
        lastName: 'De-Volle IV',
        jobTitle: 'Sales Executive',
        division: 'Motor',
        salary: 75000,
        commissionRate: 5.5,
        email: 'Maximillian.devolle@faux.it',
        joinDate: new Date(),
        imageUrl: '',
        locationId: 2
    },
    {
        id: 5,
        firstName: 'Elijah',
        lastName: 'Hargreave-Brewer',
        jobTitle: 'Sales Executive',
        division: 'Motor',
        salary: 77550,
        commissionRate: 5.67,
        email: 'Elijah.HargreaveBrewer@faux.it',
        joinDate: new Date(),
        imageUrl: '',
        locationId: 2
    }
    ,
    {
        id: 6,
        firstName: 'Baz',
        lastName: '',
        jobTitle: 'Sales Executive',
        division: 'Baked Goods',
        salary: 10000000,
        commissionRate: 1,
        email: 'bazza@faux.it',
        joinDate: new Date(),
        imageUrl: '',
        locationId: 5
    }
]

export default employees
