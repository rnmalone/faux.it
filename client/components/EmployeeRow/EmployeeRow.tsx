import React from 'react';
import moment from 'moment';
import {Cell, TableRowProps} from "react-table";
import {EmployeeDTO} from "../../../server/entities/Employee";

export interface IEmployeeRowProps {
    rowProps: TableRowProps,
    cells: Cell<EmployeeDTO>[]
}

export default function EmployeeRow({ rowProps, cells }: IEmployeeRowProps) {
    console.log(cells)

    const rowCellRenderableMap: {
        [key: string]: (cell: Cell<EmployeeDTO>) => any
    } = {
        imageUrl: (cell) => <img className="thumbnail" src={cell.value} />,
        name: (cell) => `${cell.row.original.firstName} ${cell.row.original.lastName}`,
        jobTitle: (cell) => cell.value,
        division: (cell) => cell.value,
        email: (cell) => cell.value,
        joinDate: (cell) => moment(Number(cell.value)).format('DD-MM-YYYY'),
    }

    return (
        <tr {...rowProps}>
            {
                cells.map((cell: Cell<EmployeeDTO>) => (
                    <td {...cell.getCellProps()}>
                        {rowCellRenderableMap[cell.column.id] && rowCellRenderableMap[cell.column.id](cell)}
                    </td>
                ))
            }
        </tr>
    )
}
