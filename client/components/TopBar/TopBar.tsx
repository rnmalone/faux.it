import React from 'react';

import './TopBar.scss';
import LanguageSelector from "../LanguageSelector/container/LanguageSelector";

export default function TopBar() {

    return (
        <div className="TopBar">
            <div className="TopBar__fixed">
                <LanguageSelector />

            </div>
        </div>
    )
}