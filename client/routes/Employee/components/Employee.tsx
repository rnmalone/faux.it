import React, {useState} from 'react';
import '../styles/Employee.scss';
import {useQuery} from "@apollo/client";
import {useParams} from "react-router";
import employeeQuery from '../../../api/employee.graphql'
import Value from "../../../components/Value";
import {CSSTransition} from "react-transition-group";
import Statistic from "../../../components/Statistic";
import Statistics from "./Statistics";

export default function Employee() {
    const [viewedTab, setViewedTab] = useState()
    const { id } = useParams()
    const { data } = useQuery(employeeQuery, {
        variables: { id: Number(id) }
    })

    return (
        <div className="page">
            <div className="page__upper Employee__upper">
                <img className="Employee__dp" src={data?.employee?.imageUrl} />
                <div className="Employee__upper__details">
                    <div className="Employee__upper__details__header">
                        <h2>{`${data?.employee?.firstName} ${data?.employee?.lastName}`}</h2>
                        <span>{data?.employee.email}</span>
                    </div>
                    <dl className="Employee__upper__details__data">
                        <Value label='Job Title' value={data?.employee?.jobTitle} />
                        <Value label='Division' value={data?.employee?.division} />
                        <Value label='Salary' value={data?.employee?.salary} />
                        <Value label='Commission' value={data?.employee?.commissionRate} />
                    </dl>
                </div>
            </div>
            <div className="page__body">
                <Statistics id={Number(id)} />
            </div>
        </div>
    )
}
