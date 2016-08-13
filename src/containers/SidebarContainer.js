import { connect } from 'react-redux'

import Sidebar from 'components/Sidebar'

const mapStateToProps = (state) => ({
  files: state.files.files,
  lastUpdated: state.files.lastUpdated
})

export default connect(mapStateToProps)(Sidebar)
