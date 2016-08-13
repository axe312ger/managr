import { connect } from 'react-redux'

import { changePath, popDir } from 'redux/modules/Files'

import Sidebar from 'components/Sidebar'
import { folder, path } from 'redux/selectors/tree'

const mapStateToProps = (state) => {
  const node = folder(state) || {}

  return {
    node,
    path: path(state),
    lastUpdated: node.lastUpdated || (node.stats && node.stats.modified)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changePath: (path) => {
      dispatch(changePath(path))
    },
    popDir: () => {
      dispatch(popDir())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
