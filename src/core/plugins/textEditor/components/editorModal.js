import React from 'react'

import AceEditor from 'react-ace'

import 'brace/mode/javascript'
import 'brace/mode/markdown'
import 'brace/theme/github'

import classes from './editorModal.scss'

export default React.createClass({
  onChange (newVal) {
    this.setState({currentValue: newVal})
  },
  onSave () {
    this.setState({
      saveTitle: 'saving...',
      saveEnabled: false
    })
    this.context.managr.fileAPI.updateAsText(this.props.file, this.state.currentValue)
      .then(() => {
        this.props.close()
      })
  },
  getInitialState () {
    return {
      currentValue: this.props.initialValue,
      saveTitle: 'save',
      saveEnabled: true
    }
  },
  render () {
    return (
      <div>
        <header>
          <h1 className={classes.title}>Editing {this.props.file.name}</h1>
        </header>
        <main>
          <AceEditor
            mode='markdown'
            theme='github'
            onChange={this.onChange}
            name='UNIQUE_ID_OF_DIV'
            value={this.state.currentValue}
            className={classes.editor}
            width='100%'
            height='calc(100vh - 200px)'
            wrapEnabled
            editorProps={{
              $blockScrolling: true
            }}
            />
        </main>
        <footer className={classes.actions}>
          <button onClick={this.props.close}>close</button>
          <button disabled={!this.state.saveEnabled} onClick={this.onSave}>{this.state.saveTitle}</button>
        </footer>
      </div>
    )
  },
  propTypes: {
    file: React.PropTypes.object.isRequired,
    initialValue: React.PropTypes.string.isRequired,
    close: React.PropTypes.func.isRequired
  },
  contextTypes: {
    managr: React.PropTypes.object.isRequired
  }
})
