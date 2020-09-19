import { connect } from 'react-redux';
import EmployeeList from '../components/EmployeeList'
import {IAppStore} from "../../../@types/store";
import {FilterType} from "../../../modules/filters/filters";

const mapStateToProps = (state: IAppStore) => ({
    filters: state.filters.filter[FilterType.Employee].activeFilters
})

export default connect(mapStateToProps)(EmployeeList)
