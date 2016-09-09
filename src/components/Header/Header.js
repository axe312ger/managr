import React from 'react'
import { Link } from 'react-router'
import classes from './Header.scss'
import Logo from './assets/logo.svg'

export const Header = (props) => (
  <div className={classes.wrapper}>
    <div className={classes.logoWrapper}>
      <img
        className={classes.logo}
        src={Logo}
      />
      <h1>Managr.js</h1>
    </div>

    <div className={classes.menuWrapper}>
      <Link to={props.pathURI} activeClassName={classes.activeRoute}>
        Files
      </Link>
      {' · '}
      <Link to='/settings' activeClassName={classes.activeRoute}>
        Settings
      </Link>
    </div>
  </div>
)

Header.propTypes = {
  pathURI: React.PropTypes.string.isRequired
}

export default Header
