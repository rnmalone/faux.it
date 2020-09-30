import React, {useCallback, useEffect, useRef, useState} from 'react';
import cx from 'classnames';
import './EmployeeCard.scss'
import Division from "../Division/Division";
import {useNavigate} from "../../lib/hooks";

export default function EmployeeCard({
    id,
    name,
    imageUrl,
    jobTitle,
    division,
    loading
                                     }) {
    const [fetched, setFetched] = useState<boolean>(false)
    const navigate = useNavigate()


    return (
        <article className="page-item EmployeeCard" onClick={navigate(`/employee/${id}`)}>
            <img className="thumbnail" src={imageUrl}/>
            <h6>{name}</h6>
            <span>{jobTitle}</span>
            <Division type={division} />
        </article>
    )
}