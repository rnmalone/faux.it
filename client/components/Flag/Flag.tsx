import React from 'react';
import './Flag.scss';
import DE from '../../assets/images/flags/DE.svg'
import EN from '../../assets/images/flags/EN.svg'
import GB from '../../assets/images/flags/GB.svg'
import NL from '../../assets/images/flags/NL.svg'
import NR from '../../assets/images/flags/NR.svg'
import US from '../../assets/images/flags/US.svg'

const countryCodeMap = {
    DE,
    EN,
    GB,
    NL,
    NR,
    US
}

export default function Flag({countryCode}: { countryCode: string }) {
    return (
        <div className="Flag">
            <img src={countryCodeMap[countryCode]} alt={countryCode}/>
        </div>
    )
}
