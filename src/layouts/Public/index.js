// eslint-disable-next-line no-unused-vars
import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

const PublicLayout = ({ children }) => {
  return <div>{children}</div>
}

const mapStateToProps = ({ user, dispatch, settings }) => ({ user, dispatch, settings })

export default withRouter(connect(mapStateToProps)(PublicLayout))
