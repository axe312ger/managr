import { connect } from 'react-redux'

import { changePath } from 'redux/modules/Files'
import { pathURI as pathURISelector, path as pathSelector } from 'redux/selectors/tree'
import { tableNode } from 'redux/selectors/display'

import FilesView from '../components/FilesView'

import { pushPath } from 'utils/navigation'

const mapStateToProps = (state) => {
  const node = tableNode(state) || {}
  const pathURI = pathURISelector(state)
  const path = pathSelector(state)

  return {
    node,
    path,
    pathURI,
    lastUpdated: node.lastUpdated || 0
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changePath: (path) => {
      dispatch(changePath(path))
    },
    push: (path) => {
      dispatch(pushPath(path))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilesView)
