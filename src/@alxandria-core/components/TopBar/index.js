import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { calculateFee, coin, GasPrice } from '@cosmjs/stargate'
import { Button, Form, Input, Modal, notification } from 'antd'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ChainInfo from 'utils/chainInfo'
import Search from './Search'
import style from './style.module.scss'
import UserMenu from './UserMenu'

const TopBar = ({ chain, dispatch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const showModal = () => {
    console.log('Hi')
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setLoading(false)
    setError(false)
    setIsModalOpen(false)
  }

  const createProfile = async (values) => {
    setLoading(true)

    // check if logged in && user has profile name && profile name should be atleast 3 letter

    if (chain.user && !chain.user.profileName) {
      console.log('setEverything')

      const gasPrice = GasPrice.fromString(`0.002${process.env.REACT_APP_COIN_MIN_DENOM}`)
      const txFee = calculateFee(200000, gasPrice)

      const accounts = await chain.offlineSigner.getAccounts()
      const profileNameRequest = { register_profile_name: { profile_name: values.profileName } }

      try {
        await chain.cosmWasmClient.execute(
          accounts[0].address,
          process.env.REACT_APP_CONTRACT_ADDR,
          profileNameRequest,
          txFee,
          '',
          [coin(process.env.REACT_APP_CREATE_PROFILE_FEE, process.env.REACT_APP_COIN_MIN_DENOM)],
        )

        notification.success({ message: 'Profile Name created!' })

        dispatch({
          type: 'chain/SET_STATE',
          payload: {
            user: {
              address: accounts[0].address,
              profileName: values.profileName,
            },
          },
        })

        setIsModalOpen(false)
        setLoading(false)
      } catch (error1) {
        console.log(error1)
        notification.error({ message: 'Error Occurred!' })
        setLoading(false)
      }
    } else {
      setError(true)
      setLoading(false)
    }
  }

  const connectWallet = async () => {
    if (window && window.keplr) {
      if (window.keplr.experimentalSuggestChain) {
        // await window.keplr.experimentalSuggestChain(ChainInfo)
        await window.keplr.enable(ChainInfo.chainId)

        const offlineSigner = await window.keplr.getOfflineSigner(ChainInfo.chainId)
        const CosmWasmClientLocal = await SigningCosmWasmClient.connectWithSigner(
          ChainInfo.rpc,
          offlineSigner,
        )

        const accounts = await offlineSigner.getAccounts()

        // Get Profile Name here

        const profileNameRequest = { profile_name: { address: accounts[0].address } }
        // Do query type 'smart'
        const queryResult = await CosmWasmClientLocal.queryClient.wasm.queryContractSmart(
          process.env.REACT_APP_CONTRACT_ADDR,
          profileNameRequest,
        )

        console.log(queryResult, accounts[0].address)

        // console.log(accounts)

        if (CosmWasmClientLocal) {
          dispatch({
            type: 'chain/SET_STATE',
            payload: {
              cosmWasmClient: CosmWasmClientLocal,
              offlineSigner,
              loading: false,
              cosmLoaded: true,
              user: {
                address: accounts[0].address,
                profileName: queryResult.profile_name,
              },
            },
          })
        }
      } else {
        console.warn('Error accessing experimental features, please update Keplr')
      }
    } else {
      console.warn('Error accessing Keplr, please install Keplr')
    }
  }

  return (
    <>
      <div className={style.topbar}>
        <div className="mr-4">
          <Link to="/">
            <svg
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 421 90"
              style={{ enableBackground: 'new 0 0 421 90' }}
            >
              <g
                id="_x38_1305896-e4eb-4fb9-b1cf-4e6a2d51ad30"
                transform="matrix(5.655042595806296,0,0,5.655042595806296,81.83958348909857,-0.22620120202757477)"
              >
                <path
                  style={{ fill: '#250A05' }}
                  d="M1,8.1l0.5,0.1l0.3-1.1C2.2,7,2.6,7,3,7c0.8,0,1.4,0.5,1.4,1.5v0.7c-1.8,0-4,0.3-4,2.3c0,1.2,0.9,1.8,2.1,1.8
		c1,0,1.3-0.2,1.9-0.6l0.2,0.5h1.9l0.1-0.5l-0.9-0.3V9c0-1.7-0.9-2.6-2.6-2.6C2.3,6.5,1.7,6.6,1,7V8.1z M4.4,11.9
		c-0.3,0.5-0.7,0.8-1.3,0.8s-1.2-0.3-1.2-1.3c0-1,0.7-1.6,2.5-1.6V11.9z M9.5,12.4V2.9L8.9,2.7L7.4,2.9l0.1,0.5h0.7v9l-0.9,0.3
		l0.1,0.5h2.9l0.1-0.5L9.5,12.4z M15.4,9.2l1.9,2.9L16,12.6l0.1,0.6h4l0.1-0.6L19,12.1l-2.7-4.2L19,4.4l1.2-0.5l-0.1-0.6h-3
		l-0.1,0.6l1.2,0.5L16,7.4l-1.9-2.9l1.2-0.5l-0.1-0.6h-4L11.1,4l1.2,0.5L15,8.6l-2.7,3.5l-1.2,0.5l0.1,0.6h3l0.1-0.6l-1.2-0.5
		L15.4,9.2z M21.4,8.1l0.5,0.1l0.3-1.1C22.6,7,23,7,23.4,7c0.8,0,1.4,0.5,1.4,1.5v0.7c-1.8,0-4,0.3-4,2.3c0,1.2,0.9,1.8,2.1,1.8
		c1,0,1.3-0.2,1.9-0.6l0.2,0.5h1.9l0.1-0.5l-0.9-0.3V9c0-1.7-0.9-2.6-2.6-2.6c-0.7,0-1.4,0.2-2.1,0.5V8.1z M24.8,11.9
		c-0.3,0.5-0.7,0.8-1.3,0.8c-0.6,0-1.2-0.3-1.2-1.3c0-1,0.7-1.6,2.5-1.6V11.9z M29.9,12.4V7.5c0.4-0.2,0.9-0.4,1.5-0.4
		c0.7,0,1.4,0.5,1.4,1.4v3.8l-0.9,0.3l0.1,0.5h2.9l0.1-0.5l-0.9-0.3V8.8c0-1.5-0.9-2.3-2.4-2.3c-0.7,0-1.2,0.2-1.8,0.5l-0.5-0.5
		l-1.6,0.2l0.1,0.5h0.7v5.2l-0.9,0.3l0.1,0.5h2.9l0.1-0.5L29.9,12.4z M40.7,12c-0.4,0.4-0.8,0.6-1.4,0.6c-1.2,0-1.9-1.2-1.9-2.9
		s0.6-2.7,2-2.7c0.5,0,1,0.2,1.3,0.4V12z M40.7,12.7l0.2,0.5h1.9l0.1-0.5L42,12.4V2.9l-0.6-0.2l-1.6,0.2l0.1,0.5h0.8v3.4
		c-0.5-0.2-1-0.3-1.4-0.3c-2.1,0-3.3,1.4-3.3,3.5c0,2.1,1.1,3.4,3.3,3.4C39.9,13.3,40.5,12.9,40.7,12.7z M48.8,8.1V6.7
		c-0.4-0.2-0.8-0.2-1.2-0.2c-0.7,0-1.3,0.2-1.7,0.5l-0.5-0.5l-1.6,0.2l0.1,0.5h0.7v5.2l-0.9,0.3l0.1,0.5h2.9l0.1-0.5l-0.9-0.3V7.5
		c0.5-0.2,1.1-0.4,1.5-0.4c0.3,0,0.5,0,0.7,0.1l0.3,1L48.8,8.1z M51.7,12.4V6.6l-0.6-0.2l-1.5,0.2l0.1,0.5h0.7v5.2l-0.9,0.3l0.1,0.5
		h2.9l0.1-0.5L51.7,12.4z M51,3.4c-0.4,0-0.8,0.3-0.8,0.8c0,0.4,0.3,0.7,0.8,0.7c0.4,0,0.8-0.3,0.8-0.7C51.8,3.7,51.4,3.4,51,3.4z
		 M54.2,8.1l0.5,0.1L55,7.1C55.4,7,55.8,7,56.2,7c0.8,0,1.4,0.5,1.4,1.5v0.7c-1.8,0-4,0.3-4,2.3c0,1.2,0.9,1.8,2.1,1.8
		c1,0,1.3-0.2,1.9-0.6l0.2,0.5h1.9l0.1-0.5l-0.9-0.3V9c0-1.7-0.9-2.6-2.6-2.6c-0.7,0-1.4,0.2-2.1,0.5V8.1z M57.6,11.9
		c-0.3,0.5-0.7,0.8-1.3,0.8c-0.6,0-1.2-0.3-1.2-1.3c0-1,0.7-1.6,2.5-1.6V11.9z"
                />
              </g>
              <g
                id="_x39_e55363f-d49c-472e-bd48-2e843c1d7f60"
                transform="matrix(2.8125,0,0,2.8125,-12.426001459360123,0)"
              >
                <linearGradient
                  id="SVGID_1_"
                  gradientUnits="userSpaceOnUse"
                  x1="-26.4395"
                  y1="104.5985"
                  x2="-25.4395"
                  y2="104.5985"
                  gradientTransform="matrix(58.2495 38.0356 27.1622 -81.5677 -1299.8217 9547.585)"
                >
                  <stop offset="0" style={{ stopColor: '#30223A' }} />
                  <stop offset="1" style={{ stopColor: '#F13800' }} />
                </linearGradient>
                <path
                  className="st1"
                  style={{ fill: 'url(#SVGID_1_)' }}
                  d="M27.4,11.4L16,0L4.6,11.4L16,22.8C16,22.8,27.4,11.4,27.4,11.4z M16,6l5.4,5.3L16,16.7l-5.4-5.4L16,6z
		 M27.4,15l-5.7,5.7V32h5.7V15z M10.2,20.6L4.6,15v17h5.7V20.6z"
                />
              </g>
            </svg>
            <span>The Fireproof Encyclopedia</span>
          </Link>
          {/* <FavPages /> */}
        </div>
        <div className="mr-4 d-none d-md-block">{/* <IssuesHistory /> */}</div>
        <div className="mr-auto d-xl-block d-none">{/* <ProjectManagement /> */}</div>
        <div className="mr-3 d-none d-sm-block ml-auto">{/* <Cart /> */}</div>
        <div className="mr-auto col-4 mr-md-2">
          <Search />
        </div>
        {chain.user && <UserMenu onShowModal={() => showModal()} />}
        {!chain.user && (
          <Button type="primary" size="large" onClick={() => connectWallet()}>
            Connect Wallet
          </Button>
        )}
        <br />
      </div>

      <Modal title="Create Profile Name" visible={isModalOpen} footer={null} onCancel={closeModal}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <i>
                Create a unique profile name for your wallet. <br />
                Use lowercase for profile name.
              </i>
            </div>
          </div>
          <Form name="basic" layout="vertical" onFinish={createProfile}>
            <div className="row mt-4">
              <div className="col-md-12">
                {/* <Input
                className="mt-2"
                placeholder="e.g. satoshi"
                size="large"
                onChange={(e) => {
                  setProfileName(e.target.value)
                  setError(false)
                }}
              /> */}
                <Form.Item
                  label="Profile Name"
                  name="profileName"
                  rules={[
                    {
                      required: true,
                      message: 'Please input unique profile name!',
                    },
                    {
                      pattern: new RegExp('^[a-z]{1}[a-z0-9_]{2,16}$'),
                      message: 'Only include underscore and should start with letter',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
            </div>
            {error && (
              <div className="row">
                <div className="col-md-12 text-danger">
                  Error Occurred while creating profile name.
                </div>
              </div>
            )}
            <div className="row mt-3">
              <div className="col-md-12">
                <Button type="primary" htmlType="submit" loading={loading}>
                  Create Profile Name
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  )
}

const mapStateToProps = ({ chain, dispatch }) => ({
  dispatch,
  chain,
})

export default connect(mapStateToProps)(TopBar)
