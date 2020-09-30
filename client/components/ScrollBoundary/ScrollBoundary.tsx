import React, {RefObject, useCallback, useEffect, useRef, useState} from 'react';
import debounce from "lodash.debounce";

import './ScrollBoundary.scss';


export default function ScrollBoundary({ onEnterViewport }) {
    const [isVisible, setIsVisible] = useState(false);
    const currentElement = useRef(null);

    const onScroll = debounce(() => {
        if (!currentElement.current) {
            setIsVisible(false);
            return;
        }
        const top = currentElement.current.getBoundingClientRect().top;
        setIsVisible(top + 0 >= 0 && top - 0 <= window.innerHeight);
    }, 100)

    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    });

    useEffect(() => {
        if(isVisible) {
            onEnterViewport()
        }
    }, [isVisible])


    return (
        <div className="ScrollBoundary" ref={currentElement} />
    )
}