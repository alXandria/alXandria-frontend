import React from 'react'
import WalletConnect from 'components/HomeComponent'
import { Helmet } from 'react-helmet'
import ReactGA from 'react-ga4'

const Login = () => {
  ReactGA.send({ hitType: 'pageview', page: '/auth/login' })
  return (
    <div>
      <Helmet title="Home" />
      <WalletConnect />
    </div>
  )
}

export default Login
