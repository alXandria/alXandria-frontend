import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Button, Layout } from 'antd'
import classNames from 'classnames'
import style from './style.module.scss'

const mapStateToProps = ({ menu, settings, chain }) => ({
  menuData: menu.menuData,
  isMenuCollapsed: settings.isMenuCollapsed,
  isMobileView: settings.isMobileView,
  isMenuUnfixed: settings.isMenuUnfixed,
  isMenuShadow: settings.isMenuShadow,
  leftMenuWidth: settings.leftMenuWidth,
  menuColor: settings.menuColor,
  chain,
})

const MenuLeft = ({
  isMobileView,
  isMenuUnfixed,
  isMenuShadow,
  leftMenuWidth,
  menuColor,
  chain,
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
        collapsed: false,
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
        className={`${style.menuOuter} pb-5`}
        style={{
          width: leftMenuWidth,
          height: isMobileView || isMenuUnfixed ? 'calc(100% - 64px)' : 'calc(100% - 110px)',
        }}
      >
        <div className="container mt-5">
          {chain.user && (
            <div className={`${style.menuItem} mb-5`}>
              <Link to="/create-post">
                <Button type="primary">New Post</Button>
              </Link>
            </div>
          )}
          <div className={style.menuItem}>
            <a href="/about">About alXandria</a>
          </div>
          <br />
          <div className={style.menuItem}>
            <a href="https://docs.alxandria.org/" target="_blank" rel="noopener noreferrer">
              Help
            </a>
          </div>
          <br />
          <div className={style.menuItem}>
            <a href="https://docs.alxandria.org/" target="_blank" rel="noopener noreferrer">
              How it works
            </a>
          </div>
          <div className={style.menuItem}>
            <a
              href="https://docs.alxandria.org/how-to-use-alxandria/post-an-article"
              target="_blank"
              rel="noopener noreferrer"
            >
              How to contribute
            </a>
          </div>
          <div className={style.menuItem}>
            <a
              href="https://docs.alxandria.org/how-to-use-alxandria/edit-an-article"
              target="_blank"
              rel="noopener noreferrer"
            >
              How to edit
            </a>
          </div>
          <br />
          <div className={style.menuItem}>Partnerships</div>
          <div style={{ paddingLeft: '10px' }}>
            <div className={style.menuItem}>
              <a href="/research">Research</a>
            </div>
            <div className={style.menuItem}>
              <a href="/institutional">Institutional</a>
            </div>
            <div className={style.menuItem}>
              <a href="/ecosystem">Ecosystem</a>
            </div>
          </div>
          <br />
          <div className={style.menuItem}>Media</div>
          <div style={{ paddingLeft: '10px' }}>
            <div className={style.menuItem}>
              <a href="/news">News</a>
            </div>
            <div className={style.menuItem}>
              <a href="/current-events">Current Events</a>
            </div>
          </div>
          <br />
          <div className={style.menuItem}>
            <a href="/contributors" rel="noopener noreferrer">
              Contributors
            </a>
          </div>
          <div className={style.menuItem}>
            <a href="#" rel="noopener noreferrer">
              Other Projects
            </a>
          </div>
          <div className={style.menuItem}>
            <a
              href="https://docs.alxandria.org/intro/resources"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact us
            </a>
          </div>
        </div>
      </div>
    </Layout.Sider>
  )
}

export default withRouter(connect(mapStateToProps)(MenuLeft))
