import React from 'react'

import { isLeaf, isNode } from 'utils/datastructure'

import classes from './Icon.scss'

import folderFrontside from './assets/folder-frontside.svg'
import folderBackside from './assets/folder-backside.svg'
import documentIcon from './assets/document.svg'
import photoIcon from './assets/photo.svg'
import videoIcon from './assets/video.svg'

const DEFAULT_TYPE = 'text'
const ICON_TYPES = ['text', 'image', 'video']

const getIconType = (mime) => {
  if (!mime) {
    return DEFAULT_TYPE
  }
  const type = mime.split('/')[0]
  return ICON_TYPES.indexOf(type) ? type : DEFAULT_TYPE
}

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
  if (isNode(props.file)) {
    let childIcons = props.file.children
      .filter((file) => file.stats.hasOwnProperty('mime')) // drop everyting without mime
      .map((file) => file.stats.mime)
      .map((mime) => getIconType(mime)) // gather file types
      .filter((elem, pos, arr) => arr.indexOf(elem) === pos) // unqiue array
      .sort((a, b) => ICON_TYPES.indexOf(a) - ICON_TYPES.indexOf(b)) // sort
      .map((type) => getTypeIcon(type))

    // Since the icons are unique and there might be more that one or two files,
    // we duplicate the icon list to indicate that there is more.
    const leafCount = props.file.children
      .filter((file) => isLeaf(file))
      .length

    if (leafCount > childIcons.length) {
      childIcons = [...childIcons, ...childIcons]
        .slice(0, 3)
    }

    // Add unique keys to make react happy
    childIcons = childIcons.map((icon, index) => React.cloneElement(
      icon,
      {
        key: [icon.props.alt, index].join('-')
      }
    ))

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

  const type = getIconType(props.file.stats.mime)
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
