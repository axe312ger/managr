import React from 'react'

import download from './components/download'

export default function Download () {}

Download.prototype.fileActions = [{
  id: 'download',
  title: 'Download',
  component: (props) => React.createElement(download, props)
}]
