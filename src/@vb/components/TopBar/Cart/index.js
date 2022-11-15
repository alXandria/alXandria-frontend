import React, { useState } from 'react'
import { Dropdown, Badge } from 'antd'
import General26 from '@vb/widgets/WidgetsGeneral/26'
import styles from './style.module.scss'

const Actions = () => {
  const [count, setCount] = useState(2)

  const addCount = () => {
    setCount(count + 1)
  }

  const menu = (
    <React.Fragment>
      <div className="card vb__utils__shadow width-350 border-0 py-2">
        <div className="card-body">
          <General26 />
        </div>
      </div>
    </React.Fragment>
  )
  return (
    <Dropdown overlay={menu} trigger={['click']} placement="bottomRight" onVisibleChange={addCount}>
      <div className={styles.dropdown}>
        <Badge count={count} className={styles.badge}>
          <i className={`${styles.icon} fe fe-shopping-cart`} />
        </Badge>
      </div>
    </Dropdown>
  )
}

export default Actions
