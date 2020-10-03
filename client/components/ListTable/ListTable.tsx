import React from 'react';
import {usePagination, useTable} from "react-table";
import Pagination from "../Pagination";

import './ListTable.scss';

export default function ListTable({
                                      columns,
                                      data,
                                      RowComponent,
                                      totalItems = 1,
                                      setPaging,
                                      offset,
                                      limit
                                  }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    }, usePagination)

    return (
        <div className="Table">
            <table {...getTableProps()}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <RowComponent key={`row-${i}`} rowProps={row.getRowProps()} cells={row.cells}
                                      original={row.original}/>
                    )
                })}
                </tbody>
            </table>
            <Pagination
                setPaging={setPaging}
                offset={offset}
                limit={limit}
                pageCount={Math.ceil(totalItems / limit)}
            />
        </div>
    )
}
