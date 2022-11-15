import React, { useState } from 'react'
import { Dropdown, Badge } from 'antd'
import List2 from '@vb/widgets/WidgetsLists/2'
import styles from './style.module.scss'

const Actions = () => {
  const [count, setCount] = useState(7)

  const addCount = () => {
    setCount(count + 1)
  }

  const menu = (
    <React.Fragment>
      <div className="card vb__utils__shadow width-350 border-0">
        <div className="card-body p-0">
          <List2 />
        </div>
      </div>
    </React.Fragment>
  )
  return (
    <Dropdown overlay={menu} trigger={['click']} placement="bottomRight" onVisibleChange={addCount}>
      <div className={styles.dropdown}>
        <Badge count={count} className={styles.badge}>
          <i className={`${styles.icon} fe fe-bell`} />
        </Badge>
      </div>
    </Dropdown>
  )
}

export default Actions
