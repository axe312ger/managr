import Tree from './FileAPI/Tree'
import Create from './FileAPI/Create'
import Delete from './FileAPI/Delete'

import * as fileAPIredux from '../shared/redux/fileAPI'

import { resolve } from 'path'

export default function Server (config) {
  const tree = new Tree(config)
  const del = new Delete(config)
  const create = new Create(config)
  const io = config.io

  io.on('connection', (socket) => {
    console.log('Socket connected', socket.id)

    const getTree = function (action) {
      const path = action.path ? resolve(config.dir_content, action.path) : config.contentDir
      tree(path)
        .then((fileTree) => {
          socket.emit('action', fileAPIredux.treeLoaded(fileTree))
        })
    }

    const createFile = function (action) {
      const file = action.file
      try {
        create(file)
        socket.emit('action', fileAPIredux.fileCreated(file))
        getTree(fileAPIredux.getTree())
      } catch (err) {
        console.error('failed', err)
        socket.emit('action', fileAPIredux.fileErrored('Unable to create file', file))
      }
    }

    const deleteFile = function (action) {
      const file = action.file
      try {
        del(file)
        socket.emit('action', fileAPIredux.fileDeleted(file))
        getTree(fileAPIredux.getTree())
      } catch (err) {
        console.error('failed', err)
        socket.emit('action', fileAPIredux.fileErrored('Unable to delete file', file))
      }
    }

    socket.on('action', (action) => {
      console.log('Server action `${action.type}` arrived')

      if (action.type === fileAPIredux.GET_TREE) {
        getTree(action)
      }

      if (action.type === fileAPIredux.FILE_CREATE) {
        createFile(action)
      }

      if (action.type === fileAPIredux.FILE_DELETE) {
        deleteFile(action)
      }
    })

    socket.on('disconnect', () => {
      console.log('Socket disconnected', socket.id)
    })

    socket.on('error', (e) => console.error(e.stack))
  })
}
