import React from 'react';

export enum IconType {
    Chevron = 'fas fa-angle-down',
    Search = 'fas fa-search'
}

export default function Icon({ type }: { type: IconType }) {
    return (
        <i className={type} />
    )
}