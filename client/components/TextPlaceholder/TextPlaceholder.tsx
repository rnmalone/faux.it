import React from 'react';
import cx from 'classnames';

import './TextPlaceholder.scss';

export default function TextPlaceholder({ loading, children, width, height }) {
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