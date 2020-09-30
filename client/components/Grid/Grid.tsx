import React from 'react';

import './Grid.scss'

export default function Grid({ children }: { children: React.ReactNode[] }) {
    return (
        <div className="Grid">
            {children}
        </div>
    )
}