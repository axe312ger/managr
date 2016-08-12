import React from 'react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import classes from './CoreLayout.scss'
import '../../styles/core.scss'

export const CoreLayout = ({ children }) => (
  <div className={classes.wrapper}>
    <header className={classes.header}>
      <Header />
    </header>
    <main className={classes.main}>
      <div className={classes.sidebar}>
        <Sidebar />
      </div>
      <div className={classes.mainContainer}>
        {children}
      </div>
    </main>
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
