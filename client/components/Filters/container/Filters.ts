import {connect} from 'react-redux';
import Filters from '../component/Filters'
import {IAppStore} from "../../../@types/store";
import {setTerm, toggleFilterItem} from "../../../modules/filters/filters";

const mapStateToProps = (state: IAppStore) => ({
    filters: state.filters.filter
})

const mapDispatchToProps = {
    toggleFilterItem,
    setTerm
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters)
