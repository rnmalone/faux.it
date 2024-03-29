import React from "react";
import Dropdown from "../../Dropdown";
import {IFacetResult} from "../../../../@types/Facet";
import {EMPLOYEE_KEY_STRING_MAP} from "../../../../server/config/strings.config";
import {IEmployeeEntity} from "../../../@types/employe";
import Input from "../../Input/Input";
import {FilterType, IFilterState} from "../../../modules/filters";
import {SortType} from "../../../../@types/SortType";

import '../styles/Filters.scss'

interface IFilters {
    stateKey: FilterType;
    facets: IFacetResult[];
    filters: IFilterState['filter'];
    sortTpe: SortType;

    setTerm(term: string): () => void;

    toggleFilterItem(stateKey: FilterType): (toToggle: string) => () => void
}

export default function Filters({stateKey, facets = [], filters, toggleFilterItem, setTerm}: IFilters) {
    return (
        <section className="Filters">
            <div className="Filters__left">
                <Input
                    onChange={setTerm(stateKey)}
                    placeholder="Filter by term"
                    value={filters[stateKey].term}
                />
                {
                    Object.entries(filters[stateKey].activeFilters).map(([filterCategory, activeItems]) => (
                        <Dropdown
                            key={`filter-${filterCategory}`}
                            itemList={facets.find((facet: IFacetResult) => facet.category === filterCategory)?.items || []}
                            selectedList={activeItems}
                            filterKey={filterCategory}
                            label={EMPLOYEE_KEY_STRING_MAP[filterCategory as keyof IEmployeeEntity]!}
                            onSelect={toggleFilterItem(stateKey)}
                        />
                    ))
                }
            </div>
        </section>
    )
}
