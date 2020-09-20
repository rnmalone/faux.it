import React from 'react';
import moment from 'moment';
import {Cell, TableRowProps} from "react-table";

import './EmployeeRow.scss';
import Flag from "../Flag/Flag";
import {IEmployeeEntity} from "../../@types/employe";

export interface IEmployeeRowProps {
    rowProps: TableRowProps,
    cells: Cell<IEmployeeEntity>[]
}

export default function EmployeeRow({rowProps, cells}: IEmployeeRowProps) {
    const rowCellRenderableMap: {
        [key: string]: (cell: Cell<IEmployeeEntity>) => any
    } = {
        imageUrl: (cell) => <img className="thumbnail" src={cell.value}/>,
        name: (cell) => (<div className="EmployeeRow__name">
            {`${cell.row.original.firstName} ${cell.row.original.lastName}`}
            <span>
                {`${cell.row.original.location.address}`}
                <Flag countryCode={cell.row.original.location.countryCode}/>
            </span>
        </div>),
        jobTitle: (cell) => cell.value,
        division: (cell) => cell.value,
        email: (cell) => cell.value,
        joinDate: (cell) => moment(Number(cell.value)).format('DD-MM-YYYY'),
    }

    return (
        <tr className="list-row EmployeeRow" {...rowProps}>
            {
                cells.map((cell: Cell<IEmployeeEntity>) => (
                    <td {...cell.getCellProps()}>
                        {rowCellRenderableMap[cell.column.id] && rowCellRenderableMap[cell.column.id](cell)}
                    </td>
                ))
            }
        </tr>
    )
}
