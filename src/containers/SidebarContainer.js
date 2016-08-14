import { connect } from 'react-redux'

import { changePath, pushDir, popDir } from 'redux/modules/Files'

import Sidebar from 'components/Sidebar'
import { folders, path } from 'redux/selectors/tree'

const mapStateToProps = (state) => {
  const node = folders(state) || {}

  return {
    node,
    path: path(state),
    lastUpdated: node.lastUpdated || 0
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changePath: (path) => {
      dispatch(changePath(path))
    },
    pushDir: (dir) => {
      dispatch(pushDir(dir))
    },
    popDir: () => {
      dispatch(popDir())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
