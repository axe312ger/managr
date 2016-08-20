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

FileAPI.prototype.read = function (file) {
  // const sender = ss.createStream()
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
  .pipe(blobStream())
  .on('finish', function () {
    var blob = this.toBlob()

    var reader = new FileReader()
    reader.addEventListener('loadend', function () {
      console.log(this.result)
      const link = document.createElement('a')
      link.download = file.name
      link.href = this.result // 'data:,' + fileContents;
      link.click()
    })
    // reader.readAsText(blob)
    reader.readAsDataURL(blob)
  })
}

FileAPI.prototype.delete = function (file) {
  this.socket.emit('action', redux.fileDelete(file))
}
