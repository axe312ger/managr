import React from 'react'

import classes from './Icon.scss'

import folderFrontside from './assets/folder-frontside.svg'
import folderBackside from './assets/folder-backside.svg'
import documentIcon from './assets/document.svg'
import photoIcon from './assets/photo.svg'
import videoIcon from './assets/video.svg'

const getType = (mime) => mime ? mime.match(/^(.*)\//).pop() : null
const getTypeIcon = (type) => {
  if (type === 'image') {
    return <img src={photoIcon} alt={type} />
  }
  if (type === 'video') {
    return <img src={videoIcon} alt={type} />
  }
  return <img src={documentIcon} alt={type} />
}

const Icon = (props) => {
  if ('children' in props.file) {
    const iconOrder = ['text', 'image', 'video']
    let childIcons = props.file.children
      .filter((file) => 'mime' in file.stats) // drop everyting without mime
      .map((file) => file.stats.mime)
      .map((mime) => getType(mime)) // gather file types
      .filter((elem, pos, arr) => arr.indexOf(elem) === pos) // unqiue array
      .sort((a, b) => iconOrder.indexOf(a) - iconOrder.indexOf(b)) // sort
      .map((type) => getTypeIcon(type))

    const leafCount = props.file.children
      .filter((file) => !('children' in file))
      .length

    if (leafCount > childIcons.length) {
      childIcons = [...childIcons, ...childIcons]
        .slice(0, 3)
    }

    return (
      <div className={classes.wrapper} title={props.file.name}>
        <img className={classes.backside} src={folderBackside} alt={props.file.name} />
        <div className={classes.children}>
          {childIcons}
        </div>
        <img className={classes.frontside} src={folderFrontside} alt={props.file.name} />
      </div>
    )
  }

  const type = getType(props.file.stats.mime)
  const typeIcon = getTypeIcon(type)

  return (
    <div className={classes.wrapper} title={props.file.name}>
      {typeIcon}
    </div>
  )
}

Icon.propTypes = {
  file: React.PropTypes.object
}

export default Icon
