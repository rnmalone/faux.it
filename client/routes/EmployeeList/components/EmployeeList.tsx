import React from 'react';
import employeeListQuery from '../../../api/employeeList.graphql'
import '../styles/EmployeeList.scss';
import {useQuery} from "@apollo/client";
import ListTable from "../../../components/ListTable";
import {EMPLOYEE_LIST_TABLE_COLUMNS} from "../../../config/tables";
import EmployeeRow from "../../../components/EmployeeRow/EmployeeRow";
import Filters from "../../../components/Filters";
import {FilterType, StoredFilters} from "../../../modules/filters/filters";
import {IPaging} from "../../../@types/tables";

interface IEmployeeList {
    filters: StoredFilters;
    term: string;
    paging: IPaging;
    setPaging(filterType: FilterType): (paging: IPaging) => void;
}

export default function EmployeeList({filters, term, paging, setPaging}: IEmployeeList) {
    const {data} = useQuery(employeeListQuery, {
        variables: {
            sortType: 'ALPHANUMERIC',
            sortDirection: 'DOWN',
            term,
            facets: filters,
            ...paging
        }
    })

    return (
        <div className="page">
            <div className="page__upper">
                <h2>Employees</h2>
            </div>
            <div className="page__body">
                <Filters
                    stateKey={FilterType.Employee}
                    facets={data?.employeeList?.facets}
                />
                <ListTable
                    RowComponent={EmployeeRow}
                    data={data?.employeeList?.items || []}
                    columns={EMPLOYEE_LIST_TABLE_COLUMNS}
                    totalItems={data?.employeeList?.count}
                    setPaging={setPaging(FilterType.Employee)}
                    limit={paging.limit}
                    offset={paging.offset}
                />
            </div>
        </div>
    )
}

