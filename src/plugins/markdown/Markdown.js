const Markdown = function () {
  this.fileActions = [{
    id: 'markdown',
    title: 'Markdown',
    target: /\.md$/
  }]

  return this
}

export default new Markdown()
