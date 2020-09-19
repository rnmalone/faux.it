import React from 'react';
import employeeListQuery from '../../../api/employeeList.graphql'
import '../styles/EmployeeList.scss';
import {useQuery} from "@apollo/client";
import ListTable from "../../../components/ListTable";
import {EMPLOYEE_LIST_TABLE_COLUMNS} from "../../../config/tables";
import EmployeeRow from "../../../components/EmployeeRow/EmployeeRow";
import Filters from "../../../components/Filters";
import webpack from "webpack";
import {FilterType} from "../../../modules/filters/filters";

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
            <Filters stateKey={FilterType.Employee} facets={data?.employeeList?.facets} />
            <ListTable RowComponent={EmployeeRow} data={data?.employeeList?.items || []} columns={EMPLOYEE_LIST_TABLE_COLUMNS} />
        </div>
    )
}

