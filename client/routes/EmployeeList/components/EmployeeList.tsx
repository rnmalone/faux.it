import React, {useEffect, useState} from 'react';
import employeeListQuery from '../../../api/employeeList.graphql'
import '../styles/EmployeeList.scss';
import {useLazyQuery, useQuery} from "@apollo/client";
import Filters from "../../../components/Filters";
import {FilterType, StoredFilters} from "../../../modules/filters/filters";
import {IPaging} from "../../../@types/tables";
import EmployeeCard from "../../../components/EmployeeCard";
import ScrollBoundary from "../../../components/ScrollBoundary";
import {useSpring} from "react-spring";

interface IEmployeeList {
    filters: StoredFilters;
    term: string;
    paging: IPaging;
    setPaging(filterType: FilterType): (paging: IPaging) => void;
}

const LIMIT_DELTA = 9;

export default function EmployeeList({ filters, term, paging, setPaging }: IEmployeeList) {
    const [viewedItems, setViewedItems] = useState([])
    const { data, fetchMore, loading } = useQuery(employeeListQuery, {
        notifyOnNetworkStatusChange: true,
        fetchPolicy: "cache-and-network",
        variables: {
            sortType: 'ALPHANUMERIC',
            sortDirection: 'DOWN',
            term,
            facets: filters,
            ...paging
        },
        onCompleted: () => {
            setViewedItems(data?.employeeList?.items || [])
        }
    })

    const handleFetchMore = async() => {

        if(loading) return void 0

        await fetchMore({
            variables: {
                sortType: 'ALPHANUMERIC',
                sortDirection: 'DOWN',
                term,
                facets: filters,
                offset: data.employeeList.items.length,
                limit: data.employeeList.items.length + LIMIT_DELTA,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) {
                    return prev;
                }

                return Object.assign({}, prev, {
                    employeeList: {
                        ...prev.employeeList,
                        items: [
                            ...prev.employeeList.items,
                            ...fetchMoreResult.employeeList.items
                        ]
                    }
                });
            }
        })
    }

    return (
        <div className="EmployeeList page">
            <div className="page__upper">
                <h2>Employees</h2>
            </div>
            <div className="page__body">
                <Filters
                    stateKey={FilterType.Employee}
                    facets={data?.employeeList?.facets}
                />
               <div className="EmployeeList__wrapper">
                   {
                       viewedItems?.map((employee) => (
                           <EmployeeCard
                               key={`card-${employee.id}`}
                               id={employee.id}
                               name={`${employee.firstName} ${employee.lastName}`}
                               jobTitle={employee.jobTitle}
                               imageUrl={employee.imageUrl}
                               division={employee.division}
                           />
                       ))
                   }
                   <ScrollBoundary onEnterViewport={handleFetchMore} />
               </div>
            </div>
        </div>
    )
}

