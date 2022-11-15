// eslint-disable-next-line no-unused-vars
import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import style from './style.module.scss'

const AuthLayout = ({ children }) => {
  return (
    <div>
      <div style={{ minHeight: 400 }}>{children}</div>
      <div className={`container-full pr-3 ${style.footer_red}`}>
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center">
            <div className="mr-3">Powered by Smart Contract</div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ user, dispatch, settings }) => ({ user, dispatch, settings })

export default withRouter(connect(mapStateToProps)(AuthLayout))
