import React from 'react';
import '../styles/Employee.scss';
import {useQuery} from "@apollo/client";
import {useParams} from "react-router";
import employeeQuery from '../../../api/employee.graphql'
import Value from "../../../components/Value";
import EmployeeStatistics from "./EmployeeStatistics/EmployeeStatistics";
import {pc, price} from "../../../lib/utils/formatters";
import TextPlaceholder from "../../../components/TextPlaceholder";
import {useScrollTo} from "../../../lib/hooks";
import {IEmployeeResult} from "../../../../@types";
import {str} from "../../../lib";

export default function Employee() {
    useScrollTo(false)(0)
    const {id} = useParams()
    const {data, loading} = useQuery<IEmployeeResult, { id: number }>(employeeQuery, {
        variables: {id: Number(id)}
    })

    return (
        <div className="page">
            <div className="page__upper Employee__upper">
                <img alt={id} className="lazy-image Employee__dp" src={data?.employee?.profileImageUrl}/>
                <div className="Employee__upper__details">
                    <div className="Employee__upper__details__header">
                        <TextPlaceholder
                            loading={loading}
                            height="50"
                            width="300"
                        >
                            <h2>{`${data?.employee?.firstName} ${data?.employee?.lastName}`}</h2>
                        </TextPlaceholder>
                        <TextPlaceholder loading={loading} height="16">
                            <span>{data?.employee.email}</span>
                        </TextPlaceholder>
                    </div>
                    <dl className="Employee__upper__details__data">
                        <Value label={str('attribute.jobTitle')} value={data?.employee?.jobTitle}/>
                        <Value label={str('attribute.division')}
                               value={str(`division.${data?.employee?.division.toLowerCase()}`)}/>
                        <Value label={str('attribute.salary')} value={price(data?.employee?.salary)}/>
                        <Value label={str('attribute.commissionRate')} value={pc(data?.employee?.commissionRate)}/>
                    </dl>
                </div>
            </div>
            <div className="page__body">
                <EmployeeStatistics division={data?.employee?.division} id={Number(id)}/>
            </div>
        </div>
    )
}
