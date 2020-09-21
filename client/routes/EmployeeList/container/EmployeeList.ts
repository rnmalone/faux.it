import {connect} from 'react-redux';
import EmployeeList from '../components/EmployeeList'
import {IAppStore} from "../../../@types/store";
import {FilterType, setPaging} from "../../../modules/filters/filters";
import {buildFacetInputFromFilters} from "../../../lib";

const mapStateToProps = (state: IAppStore) => ({
    filters: buildFacetInputFromFilters(state.filters.filter[FilterType.Employee].activeFilters),
    term: state.filters.filter[FilterType.Employee].term,
    paging: state.filters.filter[FilterType.Employee].paging
})

const mapDispatchToProps = {
    setPaging
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList)
