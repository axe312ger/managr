import { connect } from 'react-redux'

import Header from 'components/Header'
import { pathURI as pathURISelector } from 'redux/selectors/tree'

const mapStateToProps = (state) => {
  const pathURI = pathURISelector(state)

  return {
    pathURI
  }
}

export default connect(mapStateToProps)(Header)
