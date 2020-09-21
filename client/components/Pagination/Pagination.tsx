import React, {useMemo} from 'react';
import cx from 'classnames';

import './Pagination.scss';
import Icon from "../Icon";
import {IconType} from "../Icon/Icon";
import {PAGE_SIZES} from "../../config/tables";

export default function Pagination({ offset, limit, setPaging, pageCount}) {
    const pageNodes = useMemo(() => Array(pageCount).fill(null), [pageCount])

    const handleChangePage = (newOffset: number) => () => {
        setPaging({ offset: newOffset, limit })
    }

    const renderPageSizes = () => (
        <select>
            {
                PAGE_SIZES.map((size: number) => (
                    <option
                        selected={size === limit}
                        key={`$size-option-${size}`}
                    >
                        {size}
                    </option>
                ))
            }
        </select>
    )

    return (
        <div className="Pagination">
            <div className="Pagination__centre">
                <div
                    role="button"
                    tabIndex={0}
                    className="Pagination__node Pagination__node--previous"
                    onClick={handleChangePage(offset - limit)}
                >
                    <Icon type={IconType.Chevron} />
                </div>
                <div className="Pagination__pages">
                    {
                        pageNodes.map((item, i) => (
                            <div
                                role="button"
                                tabIndex={0}
                                key={`page-${i}`}
                                className={cx('Pagination__node', { 'Pagination__node--selected': false })}
                            >
                                {i + 1}
                            </div>
                        ))
                    }
                </div>
                <div
                    role="button"
                    tabIndex={0}
                    onClick={handleChangePage(offset + limit)}
                    className="Pagination__node Pagination__node--next"
                >
                    <Icon type={IconType.Chevron} />
                </div>
            </div>
            {renderPageSizes()}
        </div>
    )
}