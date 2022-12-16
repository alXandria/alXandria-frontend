import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Layout } from 'antd'
import classNames from 'classnames'
import style from './style.module.scss'

const mapStateToProps = ({ menu, settings }) => ({
  menuData: menu.menuData,
  isMenuCollapsed: settings.isMenuCollapsed,
  isMobileView: settings.isMobileView,
  isMenuUnfixed: settings.isMenuUnfixed,
  isMenuShadow: settings.isMenuShadow,
  leftMenuWidth: settings.leftMenuWidth,
  menuColor: settings.menuColor,
})

const MenuLeft = ({
  isMenuCollapsed,
  isMobileView,
  isMenuUnfixed,
  isMenuShadow,
  leftMenuWidth,
  menuColor,
}) => {
  const menuSettings = isMobileView
    ? {
        width: leftMenuWidth,
        collapsible: false,
        collapsed: false,
      }
    : {
        width: leftMenuWidth,
        collapsible: false,
        collapsed: isMenuCollapsed,
        breakpoint: 'lg',
      }

  return (
    <Layout.Sider
      {...menuSettings}
      className={classNames(`${style.menu}`, {
        [style.white]: menuColor === 'white',
        [style.gray]: menuColor === 'gray',
        [style.dark]: menuColor === 'dark',
        [style.unfixed]: isMenuUnfixed,
        [style.shadow]: isMenuShadow,
      })}
    >
      <div
        className={style.menuOuter}
        style={{
          width: isMenuCollapsed && !isMobileView ? 80 : leftMenuWidth,
          height: isMobileView || isMenuUnfixed ? 'calc(100% - 64px)' : 'calc(100% - 110px)',
        }}
      >
        <div className="container mt-5">
          <div className={style.menuItem}>
            <a href="#" target="_blank" rel="noopener noreferrer">
              About alXandria
            </a>
          </div>
          <br />
          <div className={style.menuItem}>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Help
            </a>
          </div>
          <br />
          <div className={style.menuItem}>
            <a href="#" target="_blank" rel="noopener noreferrer">
              How it works
            </a>
          </div>
          <div className={style.menuItem}>
            <a href="#" target="_blank" rel="noopener noreferrer">
              How to contribute
            </a>
          </div>
          <div className={style.menuItem}>
            <a href="#" target="_blank" rel="noopener noreferrer">
              How to edit
            </a>
          </div>
          <br />
          <div className={style.menuItem}>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Partnerships
            </a>
          </div>
          <div className={style.menuItem}>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Research
            </a>
          </div>
          <div className={style.menuItem}>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Institutional
            </a>
          </div>
          <div className={style.menuItem}>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Ecosystem
            </a>
          </div>
          <br />
          <div className={style.menuItem}>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Media
            </a>
          </div>
          <div className={style.menuItem}>
            <a href="#" target="_blank" rel="noopener noreferrer">
              News
            </a>
          </div>
          <div className={style.menuItem}>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Current Events
            </a>
          </div>
          <br />
          <div className={style.menuItem}>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Contributors
            </a>
          </div>
          <div className={style.menuItem}>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Other Projects
            </a>
          </div>
          <div className={style.menuItem}>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Contact us
            </a>
          </div>
        </div>
      </div>
    </Layout.Sider>
  )
}

export default withRouter(connect(mapStateToProps)(MenuLeft))
