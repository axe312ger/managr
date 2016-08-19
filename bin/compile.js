import fs from 'fs-extra'
import _debug from 'debug'
import webpackCompiler from '../build/webpack-compiler'
import webpackConfig from '../build/webpack.config'
import config from '../config'

const debug = _debug('app:bin:compile')
const paths = config.utils_paths

;(async function () {
  try {
    debug('Run compiler')
    const stats = await webpackCompiler(webpackConfig)
    if (stats.warnings.length && config.compiler_fail_on_warning) {
      debug('Config set to fail on warning, exiting with status code "1".')
      process.exit(1)
    }
    if (process.env.hasOwnProperty('ANALYZE')) {
      debug('Analyse complete. The resulting json file can be found at:')
      debug(__dirname)
      debug('You can use on of the following projects for further analyses:')
      debug('https://webpack.github.io/analyse/')
      debug('https://axe312ger.github.io/analyse/ (Webpack analyse with more detailed graphs)')
      debug('https://chrisbateman.github.io/webpack-visualizer/')
      fs.writeFileSync('bin/build-profile.json', JSON.stringify(stats))
    }

    debug('Copy static assets to dist folder.')
    fs.copySync(paths.client('static'), paths.dist())
  } catch (e) {
    debug('Compiler encountered an error.', e)
    process.exit(1)
  }
})()
