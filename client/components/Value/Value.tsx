import React from 'react';

import './Value.scss'

interface IValue {
    label: string;
    value: any
    children?: React.ReactElement
}

export default function Value({label, value, children}: IValue) {
    return (
        <div className="Value">
            <dt>{label}</dt>
            {children || <dd>{value}</dd>}
        </div>
    )
}