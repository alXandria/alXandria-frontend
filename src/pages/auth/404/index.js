import React from 'react'
import { Helmet } from 'react-helmet'
import Error404 from '@alxandria-core/components/Errors/404'

const System404 = () => {
  return (
    <div>
      <Helmet title="Page 404" />
      <Error404 />
    </div>
  )
}

export default System404
