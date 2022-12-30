import React from 'react'
import { Helmet } from 'react-helmet'

const Media = () => {
  return (
    <div>
      <Helmet title="Media" />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8">
            <h2>Contributors</h2>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-8">
            Institutional and independent news organizations that want to contribute to the future
            of news based on a decentralized ecosystem are more than welcome. In this section, we
            will highlight partners that are focused on editorial contributions based on conscience
            nurtured by truth. Contributors are not limited to independent news organizations.
            Contributors may submit essays, articles, opinions, and analysis in any industry.
            Contrarianism, and controversial topics are welcome.
          </div>
        </div>
      </div>
    </div>
  )
}

export default Media
