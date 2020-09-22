import React from "react";
import Dropdown from "../../Dropdown";
import {IFacet} from "../../../../server/@types/Facet";
import {EMPLOYEE_KEY_STRING_MAP} from "../../../../server/config/strings.config";
import {IEmployeeEntity} from "../../../@types/employe";

import '../styles/Filters.scss'
import Input from "../../Input/Input";

export default function Filters({stateKey, facets = [], filters, toggleFilterItem, setTerm}) {
    return (
        <section className="Filters">
            <Input
                onChange={setTerm(stateKey)}
                placeholder="Filter by term"
                value={filters[stateKey].term}
            />
            {
                Object.entries(filters[stateKey].activeFilters).map(([filterCategory, activeItems]) => (
                    <Dropdown
                        key={`filter-${filterCategory}`}
                        itemList={facets.find((facet: IFacet) => facet.category === filterCategory)?.items || []}
                        selectedList={activeItems}
                        filterKey={filterCategory}
                        label={EMPLOYEE_KEY_STRING_MAP[filterCategory as keyof IEmployeeEntity]}
                        onSelect={toggleFilterItem(stateKey)}
                    />
                ))
            }
        </section>
    )
}
