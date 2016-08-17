import { connect } from 'react-redux'

import { showHiddenFiles, hideHiddenFiles } from 'redux/modules/Settings'
import { hiddenFilesShown } from 'redux/selectors/settings'

import SettingsView from '../components/SettingsView'

const mapDispatchToProps = (dispatch) => ({
  showHiddenFiles: () => {
    dispatch(showHiddenFiles())
  },
  hideHiddenFiles: () => {
    dispatch(hideHiddenFiles())
  }
})

const mapStateToProps = (state) => ({
  hiddenFilesShown: hiddenFilesShown(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsView)
