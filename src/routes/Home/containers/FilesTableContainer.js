import { connect } from 'react-redux'

import { getTree } from 'redux/modules/Files'
import { folder } from 'redux/selectors/tree'

import FilesTable from 'components/FilesTable'

const mapStateToProps = (state) => {
  const node = folder(state) || {}

  return {
    node,
    lastUpdated: node.lastUpdated || (node.stats && node.stats.modified)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTree: () => {
      dispatch(getTree())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilesTable)
