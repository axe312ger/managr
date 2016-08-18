import { connect } from 'react-redux'

import { tableNode } from 'redux/selectors/display'
import { fileActions as fileActionsSelector } from 'redux/selectors/plugins'
import FilesTable from '../components/FilesTable'

const mapStateToProps = (state) => {
  const node = tableNode(state) || {}
  const fileActions = fileActionsSelector(state) || []

  return {
    node,
    fileActions,
    lastUpdated: node.lastUpdated || 0
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(FilesTable)
