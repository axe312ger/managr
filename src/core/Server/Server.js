import ss from 'socket.io-stream'

import Tree from './FileAPI/Tree'
import Create from './FileAPI/Create'
import Read from './FileAPI/Read'
import Update from './FileAPI/Update'
import Delete from './FileAPI/Delete'
import Move from './FileAPI/Move'

import * as fileAPIredux from '../shared/redux/fileAPI'

import { resolve } from 'path'

export default function Server (config) {
  const tree = new Tree(config)
  const create = new Create(config)
  const read = new Read(config)
  const update = new Update(config)
  const del = new Delete(config)
  const move = new Move(config)
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

    const createFile = function (stream, action) {
      const file = action.file
      const createStream = create(file)
        .on('error', (err) => {
          const msg = err.code === 'EEXIST' ? 'File already exists' : 'Unable to create file'
          socket.emit('action', fileAPIredux.fileErrored(msg, file))
        })
        .on('end', () => {
          socket.emit('action', fileAPIredux.fileCreated(file))
          getTree(fileAPIredux.getTree())
        })
      stream.pipe(createStream)
    }

    const readFile = function (stream, action) {
      const file = action.file
      const readStream = read(file)
        .on('error', () => {
          const msg = 'Unable to read file'
          socket.emit('action', fileAPIredux.fileErrored(msg, file))
        })
        .on('end', () => {
          socket.emit('action', fileAPIredux.fileReaded(file))
          getTree(fileAPIredux.getTree())
        })
      readStream.pipe(stream)
    }

    const updateFile = function (stream, action) {
      const file = action.file
      const updateStream = update(file)
        .on('error', () => {
          const msg = 'Unable to update file'
          socket.emit('action', fileAPIredux.fileErrored(msg, file))
        })
        .on('end', () => {
          socket.emit('action', fileAPIredux.fileUpdated(file))
          getTree(fileAPIredux.getTree())
        })
      stream.pipe(updateStream)
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

    const moveFile = function (action) {
      const file = action.file
      const oldPath = action.file.path
      const newPath = action.newPath

      try {
        move(oldPath, newPath)
        socket.emit('action', fileAPIredux.fileMoved(file))
        getTree(fileAPIredux.getTree())
      } catch (err) {
        console.error('failed', err)
        socket.emit('action', fileAPIredux.fileErrored('Unable to move file', file))
      }
    }

    socket.on('action', (action) => {
      console.log(`Server action ${action.type} arrived`)

      if (action.type === fileAPIredux.GET_TREE) {
        getTree(action)
      }

      if (action.type === fileAPIredux.FILE_DELETE) {
        deleteFile(action)
      }

      if (action.type === fileAPIredux.FILE_MOVE) {
        moveFile(action)
      }
    })

    ss(socket).on('action', function (stream, action) {
      console.log(`Streamed Server action ${action.type} arrived`)

      if (action.type === fileAPIredux.FILE_CREATE) {
        createFile(stream, action)
      }
      if (action.type === fileAPIredux.FILE_READ) {
        readFile(stream, action)
      }
      if (action.type === fileAPIredux.FILE_UPDATE) {
        updateFile(stream, action)
      }
    })

    socket.on('disconnect', () => {
      console.log('Socket disconnected', socket.id)
    })

    socket.on('error', (e) => console.error(e.stack))
  })
}
