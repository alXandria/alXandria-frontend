import React from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { Menu, Dropdown, Button } from 'antd'
import styles from './style.module.scss'

const mapStateToProps = ({ user, chain }) => ({ user, chain })

const ProfileMenu = ({ dispatch, chain, onShowModal }) => {
  const disconnectWallet = () => {
    dispatch({
      type: 'chain/DISCONNECTWALLET',
    })
  }

  const maskAddress = (address) => {
    return `${address.substring(0, 4)}...${address.substring(address.length - 4, address.length)}`
    // console.log(address)
  }

  const menu = (
    <Menu selectable={false}>
      <Menu.Item>
        <strong>
          <FormattedMessage id="topBar.profileMenu.hello" />,{' '}
          {(chain.user && !chain.user.profileName && maskAddress(chain.user.address)) ||
            chain.user.profileName}
        </strong>
      </Menu.Item>
      <Menu.Divider />
      {!chain.user.profileName && (
        <>
          <Menu.Item>
            <Button onClick={() => onShowModal()}>
              <i className="fe fe-user mr-2" />
              Create Profile Name
            </Button>
          </Menu.Item>
          <Menu.Divider />
        </>
      )}
      <Menu.Item>
        <a href="#" onClick={disconnectWallet}>
          <i className="fe fe-log-out mr-2" />
          Disconnect
        </a>
      </Menu.Item>
    </Menu>
  )
  return (
    <>
      <Dropdown overlay={menu} trigger={['click']}>
        <div className={styles.dropdown}>
          {chain.user && chain.user.profileName && chain.user.profileName}
          {chain.user && !chain.user.profileName && maskAddress(chain.user.address)}
        </div>
      </Dropdown>
    </>
  )
}

export default connect(mapStateToProps)(ProfileMenu)
