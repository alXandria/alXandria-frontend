import React from 'react'
import { Helmet } from 'react-helmet'

const Media = () => {
  return (
    <div>
      <Helmet title="Partnerships" />
      <div className="contianer mt-5">
        <div className="row">
          <div className="col-md-12">
            <h2>Media</h2>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-6">
            <h5>News</h5>
            Coming Soon..
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-6">
            <h5>Current Events</h5>
            Coming Soon..
          </div>
        </div>
      </div>
    </div>
  )
}

export default Media
