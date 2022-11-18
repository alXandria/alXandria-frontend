import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import NProgress from 'nprogress'
import { Helmet } from 'react-helmet'
import MainLayout from './Main'

const Layouts = {
  main: MainLayout,
}

const mapStateToProps = ({ dispatch, settings }) => ({
  dispatch,
  title: settings.logo,
  settings,
})
let previousPath = ''

const Layout = ({ children, title, location: { pathname, search }, settings, dispatch }) => {
  // NProgress & ScrollTop Management

  dispatch({
    type: 'settings/CHECK_VERSION',
    payload: {
      version: settings.version,
    },
  })

  const currentPath = pathname + search
  if (currentPath !== previousPath) {
    window.scrollTo(0, 0)
    NProgress.start()
  }
  setTimeout(() => {
    NProgress.done()
    previousPath = currentPath
  }, 300)

  const getLayout = () => {
    return 'main'
  }

  const Container = Layouts[getLayout()]

  const BootstrappedLayout = () => {
    return <Container>{children}</Container>
  }

  return (
    <Fragment>
      <Helmet titleTemplate={`${title} | %s`} title={title} />
      {BootstrappedLayout()}
    </Fragment>
  )
}

export default withRouter(connect(mapStateToProps)(Layout))
