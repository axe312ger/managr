import { connect } from 'react-redux'

import { tableNode } from 'redux/selectors/display'

import FilesTable from '../components/FilesTable'

const mapStateToProps = (state) => {
  const node = tableNode(state) || {}

  return {
    node,
    lastUpdated: node.lastUpdated || 0
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(FilesTable)
