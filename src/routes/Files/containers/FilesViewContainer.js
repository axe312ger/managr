import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { changePath } from 'redux/modules/Files'
import { currentPath as currentPathSelector, path as pathSelector } from 'redux/selectors/tree'
import { tableNode } from 'redux/selectors/display'

import FilesView from '../components/FilesView'

const mapStateToProps = (state) => {
  const node = tableNode(state) || {}
  const currentPath = currentPathSelector(state)
  const path = pathSelector(state)

  return {
    node,
    path,
    currentPath,
    lastUpdated: node.lastUpdated || 0
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changePath: (path) => {
      dispatch(changePath(path))
    },
    push: (path) => {
      dispatch(push(path))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilesView)
