import React from 'react';
import Flag from "../Flag/Flag";

import './Location.scss';

interface ILocation {
    address: string;
    countryCode: string;
    countryName: string;
}

export default function Location({ address, countryCode, countryName }: ILocation) {
    return (
        <div className="Location">
            <Flag countryCode={countryCode} />
            <div className="Location__details">
                <p className="Location__address">{address}</p>
                <span className="Location__country">{countryName}</span>
            </div>
        </div>
    )
}