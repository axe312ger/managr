import { connect } from 'react-redux'

import { tableNode } from 'redux/selectors/display'
import { path as pathSelector } from 'redux/selectors/tree'
import FilesTable from '../components/FilesTable'

const mapStateToProps = (state) => {
  const node = tableNode(state) || {}
  const path = pathSelector(state)

  return {
    node,
    path,
    lastUpdated: node.lastUpdated || 0
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(FilesTable)
