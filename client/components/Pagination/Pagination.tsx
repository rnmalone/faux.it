import React, {ChangeEvent, useMemo} from 'react';
import cx from 'classnames';

import './Pagination.scss';
import Icon from "../Icon";
import {IconType} from "../Icon/Icon";
import {PAGE_SIZES} from "../../config/tables";
import {IPaging} from "../../@types/tables";

interface IPaginationProps {
    offset: number;
    limit: number;
    pageCount: number

    setPaging(paging: IPaging): void;
}

export default function Pagination({offset, limit, setPaging, pageCount}: IPaginationProps) {
    const pageNodes = useMemo(() => Array(pageCount).fill(null), [pageCount])

    const handleChangePage = (newOffset: number) => () => {
        setPaging({offset: newOffset, limit})
    }

    const handlePageSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setPaging({offset, limit: Number(event.target.value)})
    }

    const renderPageSizes = () => (
        <select onChange={handlePageSizeChange}>
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
                    <Icon type={IconType.Chevron}/>
                </div>
                <div className="Pagination__pages">
                    {
                        pageNodes.map((item, i) => (
                            <div
                                role="button"
                                tabIndex={0}
                                key={`page-${i}`}
                                onClick={handleChangePage(limit * i)}
                                className={cx('Pagination__node', {
                                    'Pagination__node--selected': offset === limit * i
                                })}
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
                    <Icon type={IconType.Chevron}/>
                </div>
            </div>
            {renderPageSizes()}
        </div>
    )
}