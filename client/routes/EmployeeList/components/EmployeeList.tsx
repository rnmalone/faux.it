import React from 'react';
import employeeListQuery from '../../../api/employeeList.graphql'
import '../styles/EmployeeList.scss';
import {useQuery} from "@apollo/client";
import ListTable from "../../../components/ListTable";
import {EMPLOYEE_LIST_TABLE_COLUMNS} from "../../../config/tables";
import EmployeeRow from "../../../components/EmployeeRow/EmployeeRow";

export default function EmployeeList() {
    const { data, error, loading } = useQuery(employeeListQuery, {
        variables: {
            sortType: 'ALPHANUMERIC',
            sortDirection: 'DOWN',
            offset: 0,
            limit: 10,
            term: '',
            facets: []
        }
    })

    return (
        <div className="page">
            <ListTable RowComponent={EmployeeRow} data={data?.employeeList?.items || []} columns={EMPLOYEE_LIST_TABLE_COLUMNS} />
        </div>
    )
}

