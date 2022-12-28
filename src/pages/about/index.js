import React from 'react'
import { Helmet } from 'react-helmet'

const About = () => {
  return (
    <div>
      <Helmet title="About alXandria" />
      <div className="contianer mt-5">
        <div className="row">
          <div className="col-md-12">
            <h2>About</h2>
            <h3 className="mt-3">What is alXandria?</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            alXandria is an online, open-source, collaborative encyclopedic effort. It allows anyone
            to create, edit, or delete articles. It is a smart-contract on the Juno blockchain.
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-6">
            <h5>No Censorship</h5>
            By utilizing a public ledger as the database, all contributors have access to updating
            the alXandria platform. Unlike the Wikipedia Foundation, the alXandria team does not
            have special privileges to change the user-generated content on the alXandria
            smart-contract.
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-6">
            <h5>Socialized Work, Socialized Gains</h5>
            Once a suitable user base has adopted alXandria, the team will turn on fees for article
            creation, dually enabling fee-shares for authors. This means authors will receive a
            portion of the fees for editing their articles or for high page visitation.
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-6">
            <h5>Information Integrity</h5>
            alXandria will be as good as the community decides to make it. There is no one for the
            government to bribe to change alXandria&apos;s content, as the site will display what is
            posted.
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-6">
            <h5>Speed</h5>
            Considering the block time on Juno is ~6 seconds, on average, publishing an article on
            alXandria will be 1.7 million times faster than on Wikipedia.
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
