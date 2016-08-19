import React from 'react'

const markdown = (props) => (
  <div>
    <button>Markdown</button>
    <span> (node has {props.node.children.length} childs)</span>
  </div>
)

markdown.propTypes = {
  node: React.PropTypes.object.isRequired
}

export default markdown
