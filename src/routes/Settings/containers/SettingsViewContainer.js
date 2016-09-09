import { connect } from 'react-redux'

import { showHiddenFiles, hideHiddenFiles } from 'redux/modules/Settings'
import { hiddenFilesShown } from 'redux/selectors/settings'
import { tableShowFolders, tableHideFolders } from 'redux/modules/Display'
import { tableFoldersShown } from 'redux/selectors/display'

import SettingsView from '../components/SettingsView'

const mapDispatchToProps = (dispatch) => ({
  showHiddenFiles: () => {
    dispatch(showHiddenFiles())
  },
  hideHiddenFiles: () => {
    dispatch(hideHiddenFiles())
  },
  tableShowFolders: () => {
    dispatch(tableShowFolders())
  },
  tableHideFolders: () => {
    dispatch(tableHideFolders())
  }
})

const mapStateToProps = (state) => ({
  hiddenFilesShown: hiddenFilesShown(state),
  tableFoldersShown: tableFoldersShown(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsView)
