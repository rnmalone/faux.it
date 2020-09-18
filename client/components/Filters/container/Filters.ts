import { connect } from 'react-redux';
import Filters from '../component/Filters'
import {IAppStore} from "../../../@types/store";
import {toggleFilterItem} from "../../../modules/filters/filters";

const mapStateToProps = (state: IAppStore) => ({
    ...state.filters
})

const mapDispatchToProps = {
    toggleFilterItem
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters)
