import React from 'react';
import './EmployeeCard.scss'
import Division from "../Division/Division";
import {useNavigate} from "../../lib/hooks";
import Location from "../Location";
import {LocationDTO} from "../../../server/entities/Location";

interface IEmployeeCard {
    id: number;
    name: string;
    profileImageUrl: string;
    bannerImageUrl: string;
    jobTitle: string;
    division: string;
    index: number;
    location: LocationDTO
}

export default function EmployeeCard({
    id,
    name,
    profileImageUrl,
                                         bannerImageUrl,
    jobTitle,
    division,
    index,
    location
                                     }: IEmployeeCard) {
    const navigate = useNavigate()

    const handleClick = () => {
        history.replaceState(null, '', `${window.location.pathname}?scrollTo=${window.scrollY}&limit=${index}`);
        navigate(`/employee/${id}`)()
    }

    return (
        <div className="page-item EmployeeCard" onClick={handleClick}>
            <div className="EmployeeCard__img-container">
                <div className="EmployeeCard__img-container__inner">
                    <img className="EmployeeCard__img-container__banner" src={bannerImageUrl} />
                </div>
                <img className="EmployeeCard__img-container__profile thumbnail" src={profileImageUrl}/>
            </div>
            <div className="EmployeeCard__body">
                <h6>{name}</h6>
                <span>{jobTitle}</span>
            </div>
            <div className="EmployeeCard__footer">
                <Location
                    countryCode={location.countryCode}
                    address={location.address}
                    countryName={location.countryName}
                />
                <Division type={division} />
            </div>
        </div>
    )
}