import http from 'http'
import Koa from 'koa'
import socket from 'socket.io'
import fs from 'fs'
import path from 'path'
import rimraf from 'rimraf'
import convert from 'koa-convert'
import webpack from 'webpack'
import webpackConfig from '../build/webpack.config'
import historyApiFallback from 'koa-connect-history-api-fallback'
import serve from 'koa-static'
import proxy from 'koa-proxy'
import _debug from 'debug'
import config from '../config'
import webpackDevMiddleware from './middleware/webpack-dev'
import webpackHMRMiddleware from './middleware/webpack-hmr'
import tree from './lib/tree'

import { GET_TREE, treeLoaded } from '../src/redux/modules/Files'

const debug = _debug('app:server')
const paths = config.utils_paths
const app = new Koa()
const server = http.createServer(app.callback())
const io = socket()

io.attach(server)

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id)

  socket.on('action', (action) => {
    console.log(action)
    if (action.type === GET_TREE) {
      return tree()
        .then((fileTree) => {
          socket.emit('action', treeLoaded(fileTree))
        })
    }
  })

  socket.on('file/create', (data) => {
    const publicFilePath = path.join(data.path.join('/'), data.name)
    const filePath = path.join(config.dir_content, publicFilePath)

    fs.writeFile(filePath, data.fileData, (err) => {
      if (err) {
        socket.emit('action', {
          type: 'file/errored',
          msg: 'Unable to open file for writing',
          file: publicFilePath
        })
        return
      }

      socket.emit('action', {
        type: 'file/created',
        file: publicFilePath
      })

      tree()
        .then((fileTree) => {
          socket.emit('action', treeLoaded(fileTree))
        })
    })
  })

  socket.on('file/delete', (file) => {
    const filePath = path.join(config.dir_content, file.path)

    rimraf(filePath, { glob: false }, (err) => {
      if (err) {
        socket.emit('action', {
          type: 'file/errored',
          msg: 'Unable to delete file',
          file: file.path
        })
        return
      }
      socket.emit('action', {
        type: 'file/deleted',
        file: file.path
      })
      tree()
        .then((fileTree) => {
          socket.emit('action', treeLoaded(fileTree))
        })
    })
  })

  socket.on('disconnect', () => {
    console.log('Socket disconnected', socket.id)
  })

  socket.on('error', (e) => console.error(e.stack))
})

// Enable koa-proxy if it has been enabled in the config.
if (config.proxy && config.proxy.enabled) {
  app.use(convert(proxy(config.proxy.options)))
}

// This rewrites all routes requests to the root /index.html file
// (ignoring file requests). If you want to implement isomorphic
// rendering, you'll want to remove this middleware.
app.use(convert(historyApiFallback({
  verbose: false
})))

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (config.env === 'development') {
  const compiler = webpack(webpackConfig)

  // Enable webpack-dev and webpack-hot middleware
  const { publicPath } = webpackConfig.output

  app.use(webpackDevMiddleware(compiler, publicPath))
  app.use(webpackHMRMiddleware(compiler))

  // Serve static assets from ~/src/static since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(serve(paths.client('static')))
} else {
  debug(
    'Server is being run outside of live development mode, meaning it will ' +
    'only serve the compiled application bundle in ~/dist. Generally you ' +
    'do not need an application server for this and can instead use a web ' +
    'server such as nginx to serve your static files. See the "deployment" ' +
    'section in the README for more information on deployment strategies.'
  )

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(serve(paths.dist()))
}

export default server
