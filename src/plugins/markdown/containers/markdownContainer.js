import { connect } from 'react-redux'

import { tableNode } from 'redux/selectors/display'
import markdownButton from '../components/markdown'
const mapStateToProps = (state) => {
  const node = tableNode(state) || {}

  return {
    node
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(markdownButton)
