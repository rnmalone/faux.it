import React from 'react';

export enum IconType {
    Chevron = 'fas fa-angle-down',
    Search = 'fas fa-search',
    ArrowRight = 'fas fa-play'
}

export default function Icon({type}: { type: IconType }) {
    return (
        <i className={type}/>
    )
}