import { connect } from 'react-redux'
import { filesLoad } from 'redux/modules/Files'

import HomeView from '../components/HomeView'

const mapDispatchToProps = (dispatch) => {
  return {
    loadFiles: () => {
      dispatch(filesLoad())
    }
  }
}

export default connect(() => ({}), mapDispatchToProps)(HomeView)
