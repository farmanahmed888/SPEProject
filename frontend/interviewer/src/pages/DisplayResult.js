import React from 'react'
import Navbar from '../components/Navbar'
import PageHeading from '../components/PageHeading'
const DisplayResult = () => {
  return (
    <div>
        <Navbar /> 
       <PageHeading title="Positive Feedback" />
       <PageHeading title="Negative Feedback" />
    </div>
  )
}

export default DisplayResult