import {EmployeeDTO} from "../../server/entities/Employee";
import {LocationDTO} from "../../server/entities/Location";

export interface IEmployeeEntity extends EmployeeDTO {
    location: LocationDTO
}
