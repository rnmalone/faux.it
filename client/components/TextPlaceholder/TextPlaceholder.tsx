import React from 'react';
import cx from 'classnames';

import './TextPlaceholder.scss';

interface ITextPlaceholder {
    loading: boolean;
    children?: React.ReactElement | React.ReactElement[]
    width?: string;
    height?: string;
}

export default function TextPlaceholder({ loading, children, width, height }: ITextPlaceholder) {
    return (<div className={cx(
        'TextPlaceholder', {
            [`TextPlaceholder--width-${width}`]: width,
            [`TextPlaceholder--height-${height}`]: height,
        }
    )}>
        {
            loading ? <div className="TextPlaceholder__loader" /> : children
        }
    </div>)
}