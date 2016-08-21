import React from 'react'
import Modal from 'react-modal'
// import Async from 'babel!react-promise'

import EditorModal from './editorModal.js'

import 'brace'
// import AceEditor from 'react-ace'

import 'brace/mode/javascript'
import 'brace/mode/markdown'
import 'brace/theme/github'

export default React.createClass({
  render () {
    return (
      <div>
        <button onClick={this.edit}>Edit</button>
        <div>{this.modal}</div>
      </div>
    )
  },
  modal: null,
  removeModal () {
    this.modal = null
    this.forceUpdate()
  },
  renderModal (text) {
    this.modal = (
      <Modal isOpen onRequestClose={this.removeModal}>
        <EditorModal
          file={this.props.file}
          initialValue={text}
          close={this.removeModal}
        />
      </Modal>
    )
    this.forceUpdate()
  },
  edit () {
    this.context.managr.fileAPI.readAsText(this.props.file)
      .then(this.renderModal)
  },
  propTypes: {
    file: React.PropTypes.object.isRequired
  },
  contextTypes: {
    managr: React.PropTypes.object.isRequired
  }
})
