import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import style from './style.module.scss'

const mapStateToProps = ({ settings }) => ({ settings })

const Footer = ({ settings: { isContentMaxWidth } }) => {
  return (
    <div
      className={classNames(style.footer, {
        [style.footerFullWidth]: !isContentMaxWidth,
      })}
    >
      <div className={style.inner}>
        <div className="row">
          <div className="col-md-12 text-center">Powered by alXandria Smart Contract</div>
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(Footer)
