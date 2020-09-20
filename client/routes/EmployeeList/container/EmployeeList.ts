import {connect} from 'react-redux';
import EmployeeList from '../components/EmployeeList'
import {IAppStore} from "../../../@types/store";
import {FilterType} from "../../../modules/filters/filters";
import {buildFacetInputFromFilters} from "../../../lib";

const mapStateToProps = (state: IAppStore) => ({
    filters: buildFacetInputFromFilters(state.filters.filter[FilterType.Employee].activeFilters),
    term: state.filters.filter[FilterType.Employee].term
})

export default connect(mapStateToProps)(EmployeeList)
