import React from 'react'
import { Helmet } from 'react-helmet'

const Media = () => {
  return (
    <div>
      <Helmet title="Media" />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8">
            <h2>Media</h2>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-8">
            <h5>News</h5>
            Coming Soon..
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-8">
            <h5>Current Events</h5>
            Coming Soon..
          </div>
        </div>
      </div>
    </div>
  )
}

export default Media
