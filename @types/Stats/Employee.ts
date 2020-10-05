export type EmployeeSaleStatusPie = IEmployeeSalesStatusPieSegment[]

export interface IEmployeeSalesStatusPieSegment {
    status: string;
    value: number;
}