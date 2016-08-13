import { connect } from 'react-redux'

import { changePath } from 'redux/modules/Files'

import Sidebar from 'components/Sidebar'

const mapStateToProps = (state) => ({
  files: state.files.files || [],
  lastUpdated: state.files.lastUpdated
})

const mapDispatchToProps = (dispatch) => {
  return {
    changePath: (path) => {
      dispatch(changePath(path))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
