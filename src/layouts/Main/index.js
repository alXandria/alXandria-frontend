// eslint-disable-next-line no-unused-vars
import React from 'react'
import { withRouter } from 'react-router-dom'
import { Layout } from 'antd'
import { connect } from 'react-redux'
import Menu from '@alxandria-core/components/Menu'
import classNames from 'classnames'
import Footer2 from '@alxandria-core/components/Footer2'
import TopBar from '@alxandria-core/components/TopBar'

const MainLayout = ({
  children,
  isContentMaxWidth,
  isAppMaxWidth,
  isGrayBackground,
  isSquaredBorders,
  isCardShadow,
  isBorderless,
}) => {
  return (
    <div>
      <Layout
        className={classNames({
          cui__layout__contentMaxWidth: isContentMaxWidth,
          cui__layout__appMaxWidth: isAppMaxWidth,
          cui__layout__grayBackground: isGrayBackground,
          cui__layout__squaredBorders: isSquaredBorders,
          cui__layout__cardsShadow: isCardShadow,
          cui__layout__borderless: isBorderless,
        })}
      >
        <TopBar />
        <Layout>
          <Menu />
          <div style={{ minHeight: 400 }}>{children}</div>
        </Layout>
      </Layout>
      <Footer2 />
    </div>
  )
}

const mapStateToProps = ({ user, dispatch, settings }) => ({
  user,
  dispatch,
  isContentMaxWidth: settings.isContentMaxWidth,
  isAppMaxWidth: settings.isAppMaxWidth,
  isGrayBackground: settings.isGrayBackground,
  isSquaredBorders: settings.isSquaredBorders,
  isCardShadow: settings.isCardShadow,
  isBorderless: settings.isBorderless,
  isTopbarFixed: settings.isTopbarFixed,
  isGrayTopbar: settings.isGrayTopbar,
})

export default withRouter(connect(mapStateToProps)(MainLayout))
