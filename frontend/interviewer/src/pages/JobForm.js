import React from 'react'
import Navbar from '../components/Navbar'
import PageHeading from '../components/PageHeading'
import GradientInput from '../components/GradientInput'
import "./css/form.css"
const JobForm = () => {
  return (
    <div>
       <Navbar /> 
       <PageHeading title="Add Job" />
       <form className="form-style" >
        <GradientInput
          type="text"
          name="Company"
          placeholder="Company"
          className="input-styles"
        />
        <GradientInput
          type="text"
          name="Email"
          placeholder="Email"
          className="input-styles"
        /> 
        <GradientInput
          type="text"
          name="Role"
          placeholder="Role"
          className="input-styles"
        /> 
        <GradientInput
          type="text"
          name="Job Description"
          placeholder="Job Description"
          className="input-styles"
        /> 
        <GradientInput
          type="text"
          name="Experience"
          placeholder="Experience"
          className="input-styles"
        />
        <button type="submit" className="primary-btn">
          Submit
        </button>
      </form>
    </div>
  )
}

export default JobForm