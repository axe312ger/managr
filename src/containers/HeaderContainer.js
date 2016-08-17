import { connect } from 'react-redux'

import Header from 'components/Header'
import { currentPath as currentPathSelector } from 'redux/selectors/tree'

const mapStateToProps = (state) => {
  const currentPath = currentPathSelector(state)

  return {
    currentPath
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
