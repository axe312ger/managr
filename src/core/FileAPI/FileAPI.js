import ss from 'socket.io-stream'

import * as redux from '../shared/redux/fileAPI'

export default function FileAPI (config) {
  this.socket = config.io
  return this
}

FileAPI.prototype.create = function (file, path) {
  const stream = ss.createStream()

  ss(this.socket).emit('action', stream, redux.fileCreate({
    name: file.name,
    path
  }))

  ss.createBlobReadStream(file).pipe(stream)
}

FileAPI.prototype.delete = function (file) {
  this.socket.emit('action', redux.fileDelete(file))
}
