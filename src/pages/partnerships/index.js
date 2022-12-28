import React from 'react'
import { Helmet } from 'react-helmet'

const Partnerships = () => {
  return (
    <div>
      <Helmet title="Partnerships" />
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-md-12">
            <h2>Partnerships</h2>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-8">
            <h5>Research</h5>
            Institutional partnerships that reinforce decentralized access to information in a
            borderless manner are welcome into the alX ecosystem. These partnerships focus on
            scholastic access, revenue modeling and sharing, and a transparent on-chain auditability
            based model. From academia to think tanks, publishing houses and more, let&apos;s talk!
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-8">
            <h5>Institutional</h5>
            Private and Public companies across industries such as web3, blockchain, manufacturing,
            publishing, and more are welcome to explore partnering with alxandria to enable
            information dissemination, governance and decentralized access across the world. Whether
            you want to lock your articles, or focus on a unique messaging model, distribute
            institutional contributory access, let&apos;s discuss it.
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-8">
            <h5>Ecosystem</h5>
            Chains that want to add their tokens to the alX ecosystem as a means to re-engage,
            diversify, and grow their ecosystem are also welcome. This is a highly selective
            process, let&apos;s talk!
          </div>
        </div>
      </div>
    </div>
  )
}

export default Partnerships
