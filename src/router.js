import React, { lazy, Suspense } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { connect } from 'react-redux'

import Layout from 'layouts'

const routes = [
  {
    path: '/',
    Component: lazy(() => import('pages/home')),
    exact: true,
  },
  {
    path: '/create-post',
    Component: lazy(() => import('pages/create-post')),
    exact: true,
  },
  {
    path: '/post/:id',
    Component: lazy(() => import('pages/post')),
    exact: true,
  },
  {
    path: '/post/edit/:id',
    Component: lazy(() => import('pages/edit-post')),
    exact: true,
  },
  {
    path: '/auth/404',
    Component: lazy(() => import('pages/auth/404')),
    exact: true,
  },
  {
    path: '/auth/500',
    Component: lazy(() => import('pages/auth/500')),
    exact: true,
  },
  {
    path: '/about',
    Component: lazy(() => import('pages/about')),
    exact: true,
  },
  {
    path: '/research',
    Component: lazy(() => import('pages/research')),
    exact: true,
  },
  {
    path: '/institutional',
    Component: lazy(() => import('pages/institutional')),
    exact: true,
  },
  {
    path: '/ecosystem',
    Component: lazy(() => import('pages/ecosystem')),
    exact: true,
  },
  {
    path: '/news',
    Component: lazy(() => import('pages/news')),
    exact: true,
  },
  {
    path: '/current-events',
    Component: lazy(() => import('pages/current-events')),
    exact: true,
  },
  {
    path: '/media',
    Component: lazy(() => import('pages/media')),
    exact: true,
  },
  {
    path: '/contributors',
    Component: lazy(() => import('pages/contributors')),
    exact: true,
  },
]

const mapStateToProps = ({ settings }) => ({
  routerAnimation: settings.routerAnimation,
})

const Router = ({ history, routerAnimation }) => {
  return (
    <ConnectedRouter history={history}>
      <Layout>
        <Route
          render={(state) => {
            const { location } = state
            return (
              <SwitchTransition>
                <CSSTransition
                  key={location.pathname}
                  appear
                  classNames={routerAnimation}
                  timeout={routerAnimation === 'none' ? 0 : 300}
                >
                  <Switch location={location}>
                    {/* VB:REPLACE-NEXT-LINE:ROUTER-REDIRECT */}
                    {/* <Route exact path="/" render={() => <Redirect to="/" />} /> */}
                    {routes.map(({ path, Component, exact }) => (
                      <Route
                        path={path}
                        key={path}
                        exact={exact}
                        render={() => {
                          return (
                            <div className={routerAnimation}>
                              <Suspense fallback={null}>
                                <Component />
                              </Suspense>
                            </div>
                          )
                        }}
                      />
                    ))}
                    <Redirect to="/auth/404" />
                  </Switch>
                </CSSTransition>
              </SwitchTransition>
            )
          }}
        />
      </Layout>
    </ConnectedRouter>
  )
}

export default connect(mapStateToProps)(Router)
