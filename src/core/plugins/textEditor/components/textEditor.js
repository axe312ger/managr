import React from 'react'
import Modal from 'react-modal'

export default React.createClass({
  render () {
    return (
      <div>
        <button onClick={this.edit}>Edit</button>
        <Modal isOpen={this.state.modalOpen} onRequestClose={this.removeModal}>
          {this.state.modal}
        </Modal>
      </div>
    )
  },
  getInitialState () {
    return {
      modal: null,
      modalOpen: false
    }
  },
  removeModal () {
    this.setState({
      modal: null,
      modalOpen: false
    })
  },
  renderModal (text) {
    return new Promise((resolve, reject) => {
      const props = {
        file: this.props.file,
        initialValue: text,
        close: this.removeModal
      }
      require.ensure([], () => {
        const EditorModal = require('./editorModal').default
        resolve(React.createElement(EditorModal, props))
      }, 'textEditor')
    })
      .then((Modal) => {
        this.setState({
          modal: Modal,
          modalOpen: true
        })
      })
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
