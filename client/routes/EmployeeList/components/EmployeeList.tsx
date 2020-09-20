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

export default function EmployeeList({ filters, term }) {
    const {data, error, loading} = useQuery(employeeListQuery, {
        variables: {
            sortType: 'ALPHANUMERIC',
            sortDirection: 'DOWN',
            offset: 0,
            limit: 10,
            term,
            facets: filters
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
                />
            </div>
        </div>
    )
}

