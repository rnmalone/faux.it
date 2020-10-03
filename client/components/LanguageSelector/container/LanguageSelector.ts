import { connect } from 'react-redux';
import {toggleLanguage} from "../../../modules/locale";
import {IAppStore} from "../../../@types/store";
import LanguageSelector from "../component/LanguageSelector";

const mapDispatchToProps = {
    onToggleLanguage: toggleLanguage
}

const mapStateToProps = (state: IAppStore) => ({
    supportedLanguages: state.locale.supportedLanguages
})

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSelector)