const Markdown = function () {
  this.fileActions = [{
    id: 'markdown',
    title: 'Markdown',
    target: /\.md$/,
    reaction: (req, res, next) => {
      next()
    }
  }]

  return this
}

export default new Markdown()
