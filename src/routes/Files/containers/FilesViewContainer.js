import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { changePath } from 'redux/modules/Files'
import { currentPath as currentPathSelector } from 'redux/selectors/tree'
import { tableNode } from 'redux/selectors/display'

import FilesView from '../components/FilesView'

const mapStateToProps = (state) => {
  const node = tableNode(state) || {}
  const currentPath = currentPathSelector(state)

  return {
    node,
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
