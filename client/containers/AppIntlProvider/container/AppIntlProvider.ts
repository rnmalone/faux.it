import { connect } from 'react-redux';
import {IAppStore} from "../../../@types/store";
import AppIntlProvider from "../component/AppIntlProvider";

const mapStateToProps = (state: IAppStore) => ({
     ...state.locale,
})

export default connect(mapStateToProps)(AppIntlProvider)