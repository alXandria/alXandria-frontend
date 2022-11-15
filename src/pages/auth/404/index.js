import React from 'react'
import { Helmet } from 'react-helmet'
import Error404 from '@vb/components/Errors/404'
import ReactGA from 'react-ga4'

const System404 = () => {
  ReactGA.send({ hitType: 'pageview', page: '/system-404' })
  return (
    <div>
      <Helmet title="Page 404" />
      <Error404 />
    </div>
  )
}

export default System404
