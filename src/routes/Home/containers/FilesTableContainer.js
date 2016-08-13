import { connect } from 'react-redux'

import { getTree } from 'redux/modules/Files'

import FilesTable from 'components/FilesTable'

const mapStateToProps = (state) => ({
  files: state.files.files,
  lastUpdated: state.files.lastUpdated
})

const mapDispatchToProps = (dispatch) => {
  return {
    getTree: () => {
      dispatch(getTree())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilesTable)
