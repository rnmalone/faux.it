import React from 'react';
import {IComponentProps} from "../../models/generic";

import './CoreLayout.scss';
import {useWindowSize} from "../../lib/hooks";
import NavigationContainer from "../../components/Navigation";

export default function CoreLayout({children}: IComponentProps) {
    const {isMobile} = useWindowSize()

    return (
        <>
            <main role="main">
                <div className="container">
                    <NavigationContainer isMobile={isMobile}/>
                    {children}
                </div>
            </main>
        </>
    )
}
