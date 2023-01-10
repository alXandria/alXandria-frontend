import { Divider } from 'antd'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { getNewsAndCurrentEvents } from 'services/posts'

const CurrentEvents = () => {
  const [currentEvents, setCurrentEvents] = useState([])
  useEffect(() => {
    const getLatestNews = async () => {
      const { response } = await getNewsAndCurrentEvents()
      setCurrentEvents(response.data.current_events)
    }
    getLatestNews()
  })
  return (
    <div>
      <Helmet title="News" />
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-md-12">
            <h2>Current Events</h2>
          </div>
        </div>
        <Divider />
        <div className="row mt-5">
          <div className="col-md-8">
            <ul>
              {currentEvents.map((item, index) => {
                return (
                  <li key={index} style={{ fontSize: '18px' }}>
                    <a href={item.link} target="_blank" rel="noreferrer">
                      {item.title}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentEvents
