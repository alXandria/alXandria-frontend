import React from 'react'
import { Helmet } from 'react-helmet'
import Error500 from '@vb/components/Errors/500'
import ReactGA from 'react-ga4'

const System500 = () => {
  ReactGA.send({ hitType: 'pageview', page: '/system-500' })
  return (
    <div>
      <Helmet title="Page 500" />
      <Error500 />
    </div>
  )
}

export default System500
