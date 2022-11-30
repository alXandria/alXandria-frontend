import React from 'react'
import WalletConnect from 'components/HomeComponent'
import { Helmet } from 'react-helmet'

const Login = () => {
  return (
    <div>
      <Helmet title="Home" />
      <WalletConnect />
    </div>
  )
}

export default Login
