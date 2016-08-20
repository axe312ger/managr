import ss from 'socket.io-stream'

import * as redux from '../shared/redux/fileAPI'

export default function FileAPI (config) {
  this.socket = config.io
  return this
}

FileAPI.prototype.create = function (file, path) {
  const reciever = ss.createStream()
  const sender = ss.createBlobReadStream(file)

  // Emit action
  ss(this.socket).emit('action', reciever, redux.fileCreate({
    name: file.name,
    path
  }))

  // Monitor upload progress
  let size = 0
  sender.on('data', function (chunk) {
    size += chunk.length
    console.log(Math.floor(size / file.size * 100) + '%')
  })

  // Send file
  sender.pipe(reciever)
}

FileAPI.prototype.delete = function (file) {
  this.socket.emit('action', redux.fileDelete(file))
}
