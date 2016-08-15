import { connect } from 'react-redux'

import { getTree, changePath, pushDir, popDir } from 'redux/modules/Files'
import { sidebarShowFiles, sidebarHideFiles } from 'redux/modules/Display'

import Sidebar from 'components/Sidebar'
import { path } from 'redux/selectors/tree'
import { sidebarNode, sidebarFilesShown } from 'redux/selectors/display'

const mapStateToProps = (state) => {
  const node = sidebarNode(state) || {}
  const filesShown = sidebarFilesShown(state) || false

  return {
    node,
    path: path(state),
    lastUpdated: node.lastUpdated || 0,
    filesShown
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
    },
    showFiles: () => {
      dispatch(sidebarShowFiles())
    },
    hideFiles: () => {
      dispatch(sidebarHideFiles())
    },
    getTree: () => {
      dispatch(getTree())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
