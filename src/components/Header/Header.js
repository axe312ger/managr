import React from 'react'
import { IndexLink, Link } from 'react-router'
import classes from './Header.scss'
import Logo from './assets/logo.svg'

export const Header = () => (
  <div className={classes.wrapper}>
    <div className={classes.logoWrapper}>
      <img
        className={classes.logo}
        src={Logo}
      />
      <h1>Managr.js</h1>
    </div>

    <div className={classes.menuWrapper}>
      <IndexLink to='/' activeClassName={classes.activeRoute}>
        Home
      </IndexLink>
      {' · '}
      <Link to='/settings' activeClassName={classes.activeRoute}>
        Settings
      </Link>
    </div>
  </div>
)

export default Header
