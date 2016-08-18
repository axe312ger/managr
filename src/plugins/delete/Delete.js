// import React from 'react'

const Delete = function del () {
  this.fileActions = [{
    id: 'delete',
    title: 'Delete',
    reaction: (req, res, next) => {
      next()
    }
  }]

  return this
}

export default new Delete()
