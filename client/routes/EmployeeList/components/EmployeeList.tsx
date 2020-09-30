import React, {useEffect, useState} from 'react';
import employeeListQuery from '../../../api/employeeList.graphql'
import '../styles/EmployeeList.scss';
import {useQuery} from "@apollo/client";
import Filters from "../../../components/Filters";
import {FilterType, StoredFilters} from "../../../modules/filters/filters";
import {IPaging} from "../../../@types/tables";
import EmployeeCard from "../../../components/EmployeeCard";
import ScrollBoundary from "../../../components/ScrollBoundary";
import {useQueryString, useScrollTo} from "../../../lib/hooks";
import Grid from "../../../components/Grid";
import {EmployeeDTO} from "../../../../server/entities/Employee";
import {IFacetResult} from "../../../../server/@types/Facet";
import useQueryResultHydration from "../../../lib/hooks/useQueryResultHydration";
import {LocationDTO} from "../../../../server/entities/Location";

interface IEmployeeList {
    filters: StoredFilters;
    term: string;
    paging: IPaging;
    setPaging(filterType: FilterType): (paging: IPaging) => void;
}

const LIMIT_DELTA = 9;
const MIN_LIMIT = 12;

interface IEmployeeResult extends EmployeeDTO { location: LocationDTO }

export interface IEmployeeListQueryResponse {
    employeeList: {
        count: number;
        facets: IFacetResult[];
        items: IEmployeeResult[];
    }
}

export default function EmployeeList({ filters, term, paging }: IEmployeeList) {
    const [hasScrolled, setHasScrolled] = useState<boolean>(false)
    const { scrollTo, limit } = useQueryString();
    const handlePageScroll = useScrollTo();
    const { data, fetchMore, loading } = useQuery(employeeListQuery, {
        notifyOnNetworkStatusChange: true,
        variables: {
            sortType: 'ALPHANUMERIC',
            sortDirection: 'DOWN',
            term,
            facets: filters,
            ...paging,
            limit: limit ? Math.max(Number(limit), MIN_LIMIT) : paging.limit
        }
    })

    const viewedItems = useQueryResultHydration<IEmployeeResult>(data?.employeeList?.items)

    useEffect(() => {
        if(!hasScrolled && viewedItems.length && scrollTo) {
            handlePageScroll(Number(scrollTo))
            history.replaceState(null, '', window.location.pathname);
            setHasScrolled(true)
        }
    }, [viewedItems, scrollTo])

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
            updateQuery: (prev: IEmployeeListQueryResponse, { fetchMoreResult }) => {
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
               <Grid>
                   {
                       viewedItems?.map((employee, i) => (
                           <EmployeeCard
                               key={`card-${employee.id}`}
                               id={employee.id}
                               index={i}
                               name={`${employee.firstName} ${employee.lastName}`}
                               jobTitle={employee.jobTitle}
                               profileImageUrl={employee.profileImageUrl}
                               bannerImageUrl={employee.bannerImageUrl}
                               division={employee.division}
                               location={employee.location}
                           />
                       ))
                   }
                   <ScrollBoundary onEnterViewport={handleFetchMore} />
               </Grid>
            </div>
        </div>
    )
}

