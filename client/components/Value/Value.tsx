import React from 'react';

import './Value.scss'

export default function Value({ label, value, children }) {
    return (
        <div className="Value">
            <dt>{label}</dt>
            { children || <dd>{value}</dd> }
        </div>
    )
}