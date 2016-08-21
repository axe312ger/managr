import ss from 'socket.io-stream'
import blobStream from 'blob-stream'

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

FileAPI.prototype.readAsText = function (file) {
  return this._read(file)
    .then((blob) => {
      var reader = new FileReader()
      return new Promise((resolve, reject) => {
        reader.addEventListener('loadend', () => resolve(reader.result))
        reader.readAsText(blob)
      })
    })
}

FileAPI.prototype.readAsDataURL = function (file) {
  return this._read(file)
    .then((blob) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.addEventListener('loadend', () => resolve(reader.result))
        reader.readAsDataURL(blob)
      })
    })
}

FileAPI.prototype.readAsArrayBuffer = function (file) {
  return this._read(file)
    .then((blob) => {
      var reader = new FileReader()
      return new Promise((resolve, reject) => {
        reader.addEventListener('loadend', () => resolve(reader.result))
        reader.readAsArrayBuffer(blob)
      })
    })
}

FileAPI.prototype.readAsBinaryString = function (file) {
  return this._read(file)
    .then((blob) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.addEventListener('loadend', () => resolve(reader.result))
        reader.readAsBinaryString(blob)
      })
    })
}

FileAPI.prototype._read = function (file) {
  return new Promise((resolve, reject) => {
    const reciever = ss.createStream()

    // Emit action
    ss(this.socket).emit('action', reciever, redux.fileRead(file))

    // Monitor read progress
    // Currently does not work since size is not know
    let size = 0
    reciever.on('data', function (chunk) {
      size += chunk.length
      console.log(Math.floor(size / file.stats.size * 100) + '%')
    })
    // @todo find a way to avoid blob-stream
    .pipe(blobStream())
    .on('finish', function () {
      resolve(this.toBlob())
    })
  })
}

FileAPI.prototype.delete = function (file) {
  this.socket.emit('action', redux.fileDelete(file))
}
