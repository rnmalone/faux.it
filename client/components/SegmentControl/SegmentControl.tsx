import React from 'react';
import cx from 'classnames';

import './SegmentControl.scss';
import shortid from "shortid";

interface ISegment {
    key: any,
    value: string
}

interface ISegmentControl<T> {
    segments: ISegment[]
    onClick(key: T): () => void
    selected: T // key
}

export default function SegmentControl<T>({ segments, onClick, selected }: ISegmentControl<T>) {
    const selectedSegmentIndex = segments.findIndex(({key}) => key === selected);

    return (
        <div className="SegmentControl">
            {
                segments.map((segment: ISegment) => (
                    <div
                        key={shortid()}
                        role="button"
                        onClick={onClick(segment.key)}
                        className={cx('SegmentControl__item', { 'SegmentControl__item--selected': selected === segment.key })}
                    >
                        <p>{segment.value}</p>
                    </div>
                ))
            }
            <div className="SegmentControl__select-indicator" style={{ transform: `translate(${100 * selectedSegmentIndex}%)` }} />
        </div>
    )
}