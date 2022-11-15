import React, { useEffect } from 'react'
import HomeComponent from 'components/HomeComponent'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import ReactGA from 'react-ga4'
import { Spin } from 'antd'

const Home = ({ chain, dispatch }) => {
  ReactGA.send({ hitType: 'pageview', page: '/' })

  useEffect(() => {
    dispatch({
      type: 'chain/SETUP',
    })
  }, [dispatch])

  return (
    <Spin spinning={chain.loading}>
      <div>
        <Helmet title="Home" />
        {chain.cosmLoaded && chain.cosmWasmClient && <HomeComponent />}
      </div>
    </Spin>
  )
}

const mapStateToProps = ({ chain, dispatch }) => ({
  chain,
  dispatch,
})

export default connect(mapStateToProps)(Home)
