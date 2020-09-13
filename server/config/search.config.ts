export type SearchField = string | string[]

export const EMPLOYEE_SEARCHABLE_FIELDS: SearchField[] = [
    'firstName',
    'lastName',
    'email',
    'division',
    'jobTitle',
    'locationId',
    ['location', 'address'],
]

export const SALE_SEARCHABLE_FIELDS: SearchField[] = [
    'customerName',
    'employee'
]

export const LOCATION_SEARCHABLE_FIELDS: SearchField[] = [
    'address',
    'countryName',
    'countryCode'
]
