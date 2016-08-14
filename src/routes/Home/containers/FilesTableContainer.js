import { connect } from 'react-redux'

import { getTree } from 'redux/modules/Files'
import { files } from 'redux/selectors/tree'

import FilesTable from '../components/FilesTable'

const mapStateToProps = (state) => {
  const node = files(state) || {}

  return {
    node,
    lastUpdated: node.lastUpdated || 0
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
