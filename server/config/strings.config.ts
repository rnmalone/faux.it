import {IEmployeeEntity} from "../../client/@types/employe";

export const EMPLOYEE_KEY_STRING_MAP: Partial<Record<keyof IEmployeeEntity, string>> = {
    division: 'Division',
    location: 'Location',
    jobTitle: 'Job Title'
}
