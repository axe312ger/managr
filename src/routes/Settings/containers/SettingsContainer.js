import { connect } from 'react-redux'

import { showHiddenFiles, hideHiddenFiles } from 'redux/modules/Settings'
import { hiddenFilesShown } from 'redux/selectors/settings'

import Settings from '../components/Settings'

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

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
