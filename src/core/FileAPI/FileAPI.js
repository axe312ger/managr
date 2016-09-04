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
  sender.on('data', (chunk) => {
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
    let fileContent = []
    let fileSize = 0

    // Emit action
    ss(this.socket).emit('action', reciever, redux.fileRead(file))

    reciever.on('data', (chunk) => {
      fileContent.push(chunk)
      fileSize += chunk.length
      console.log(Math.floor(fileSize / file.stats.size * 100) + '%')
    })

    reciever.on('finish', () => resolve(new Blob(fileContent)))
  })
}

FileAPI.prototype.updateAsText = function (file, text) {
  return new Promise((resolve, reject) => {
    var blob = new File(
      [text],
      {
        type: file.stats.mime
      }
    )

    const reciever = ss.createStream()
    const sender = ss.createBlobReadStream(blob)

    // Emit action
    ss(this.socket).emit('action', reciever, redux.fileUpdate(file))

    // Monitor upload progress
    let size = 0
    sender.on('data', (chunk) => {
      size += chunk.length
      console.log(Math.floor(size / blob.size * 100) + '%')
    })

    sender.on('end', () => resolve())

    // Send file
    sender.pipe(reciever)
  })
}

FileAPI.prototype.delete = function (file) {
  this.socket.emit('action', redux.fileDelete(file))
}

FileAPI.prototype.move = function (file, newPath) {
  this.socket.emit('action', redux.fileDelete(file, newPath))
}
