import * as redux from '../shared/redux/fileAPI'

export default function FileAPI (config) {
  this.socket = config.io
  return this
}

FileAPI.prototype.create = function (file) {
  this.socket.emit('action', redux.fileCreate(file))
}

FileAPI.prototype.delete = function (file) {
  this.socket.emit('action', redux.fileDelete(file))
}
