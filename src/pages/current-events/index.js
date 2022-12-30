import React from 'react'
import { Helmet } from 'react-helmet'

const CurrentEvents = () => {
  return (
    <div>
      <Helmet title="Current Events" />
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-md-12">
            <h2>Current Events</h2>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-8">Coming Soon...</div>
        </div>
      </div>
    </div>
  )
}

export default CurrentEvents
