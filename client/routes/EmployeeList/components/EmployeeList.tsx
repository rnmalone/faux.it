import React, {useEffect} from 'react';
import employeeListQuery from '../../../api/employeeList.graphql'
import '../styles/EmployeeList.scss';
import {useLazyQuery, useQuery} from "@apollo/client";
import ListTable from "../../../components/ListTable";
import {EMPLOYEE_LIST_TABLE_COLUMNS} from "../../../config/tables";
import EmployeeRow from "../../../components/EmployeeRow/EmployeeRow";
import Filters from "../../../components/Filters";
import {FilterType} from "../../../modules/filters/filters";
import {buildFacetInputFromFilters} from "../../../lib";
import Input from "../../../components/Input/Input";

export default function EmployeeList({ filters, term, paging, setPaging }) {
    const {data, error, loading, fetchMore } = useQuery(employeeListQuery, {
        fetchPolicy: "cache-and-network",
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

