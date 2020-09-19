import React from "react";
import Dropdown from "../../Dropdown";
import {IFacet} from "../../../../server/@types/Facet";

export default function Filters({ stateKey, facets = [], filters, toggleFilterItem }) {
    return (
        <section>
            {
                Object.entries(filters[stateKey].activeFilters).map(([filterCategory, activeItems]) => (
                   <Dropdown
                        key={`filter-${filterCategory}`}
                        itemList={facets.find((facet: IFacet) => facet.category === filterCategory)?.items || []}
                        selectedList={activeItems}
                        label={filterCategory}
                        onSelect={toggleFilterItem(stateKey)}
                   />
                ))
            }
        </section>
    )
}
