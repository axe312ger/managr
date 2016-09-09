import { connect } from 'react-redux'

import { tableNode, tableFoldersShown as tableFoldersShownSelector } from 'redux/selectors/display'
import { path as pathSelector } from 'redux/selectors/tree'
import { pushDir, popDir } from 'redux/modules/Files'
import { isNode } from 'utils/datastructure'

import FilesTable from '../components/FilesTable'

const mapStateToProps = (state) => {
  const tableFoldersShown = tableFoldersShownSelector(state) || false
  const node = tableNode(state) || {}
  const path = pathSelector(state)

  return {
    node,
    path,
    lastUpdated: node.lastUpdated || 0,
    tableFoldersShown
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilesTable)
