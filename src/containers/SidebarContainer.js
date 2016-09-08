import { connect } from 'react-redux'

import { getTree } from 'core/shared/redux/fileAPI'
import { pushDir, popDir } from 'redux/modules/Files'
import { sidebarShowFiles, sidebarHideFiles } from 'redux/modules/Display'

import Sidebar from 'components/Sidebar'
import { path as pathSelector } from 'redux/selectors/tree'
import { sidebarNode, sidebarFilesShown } from 'redux/selectors/display'

import { isNode } from 'services/datastructure'

const mapStateToProps = (state) => {
  const node = sidebarNode(state) || {}
  const filesShown = sidebarFilesShown(state) || false
  const path = pathSelector(state)

  return {
    node,
    path,
    lastUpdated: node.lastUpdated || 0,
    filesShown
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    pushDir: (dir) => {
      if (isNode(dir)) {
        dispatch(pushDir(dir))
      }
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
