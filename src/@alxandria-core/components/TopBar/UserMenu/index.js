import React from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { Menu, Dropdown } from 'antd'
import styles from './style.module.scss'

const mapStateToProps = ({ user, chain }) => ({ user, chain })

const ProfileMenu = ({ dispatch, chain }) => {
  const disconnectWallet = () => {
    dispatch({
      type: 'chain/DISCONNECTWALLET',
    })
  }

  const maskAddress = (address) => {
    return `${address.address.substring(0, 4)}...${address.address.substring(
      address.address.length - 4,
      address.address.length,
    )}`
    // console.log(address)
  }

  const menu = (
    <Menu selectable={false}>
      <Menu.Item>
        <strong>
          <FormattedMessage id="topBar.profileMenu.hello" />,{' '}
          {maskAddress(chain.address) || 'Anonymous'}
        </strong>
        <div>Pro User</div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <a href="#" onClick={(e) => e.preventDefault()}>
          <i className="fe fe-user mr-2" />
          <FormattedMessage id="topBar.profileMenu.editProfile" />
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <a href="#" onClick={disconnectWallet}>
          <i className="fe fe-log-out mr-2" />
          <FormattedMessage id="topBar.profileMenu.logout" />
        </a>
      </Menu.Item>
    </Menu>
  )
  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <div className={styles.dropdown}>{chain.user && maskAddress(chain.address)}</div>
    </Dropdown>
  )
}

export default connect(mapStateToProps)(ProfileMenu)
