import React from 'react';
import {IComponentProps} from "../../models/generic";

import './CoreLayout.scss';
import {useWindowSize} from "../../lib/hooks";
import NavigationContainer from "../../components/Navigation";
import TopBar from "../../components/TopBar";

export default function CoreLayout({children}: IComponentProps) {
    const {isMobile} = useWindowSize()

    return (
        <>
            <main role="main">
                <div className="container">
                    <NavigationContainer isMobile={isMobile}/>
                    <div id={"contents"}>
                        <TopBar />
                        {children}
                    </div>
                </div>
            </main>
        </>
    )
}
