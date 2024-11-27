import React from 'react'
import Navbar from '../components/Navbar'
import PageHeading from '../components/PageHeading'
import GradientInput from '../components/GradientInput'
import "./css/form.css"
import { useState } from 'react'
import { SendJob } from '../api/Apis'
import { useNavigate } from 'react-router-dom'
const JobForm = () => {
  const navigate = useNavigate();
  const interviewer_id = localStorage.getItem("interviewer_id");
  const [company, setCompany] = useState('');
  const [contact, setContact] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [roleType, setRoleType] = useState('');
  const [experience, setExperience] = useState(0);
  const [requirements, setRequirements] = useState([]);
  const handleroleTypeChange = (event) => {
    setRoleType(event.target.value);
  };
  const handleRequirementsChange = (e) => {
    const tech = e.target.value;
    setRequirements((prevRequirements) =>
      prevRequirements.includes(tech)
        ? prevRequirements.filter(item => item !== tech)
        : [...prevRequirements, tech]
    );
  };

  const createJobDTO = (company, jobDescription, roleType, requirements, contact, experience) => ({
    company,
    contact,
    jobDescription,
    roleType,
    interviewerId: Number(interviewer_id),
    requirements: Array.from(requirements),
    experience,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const uploadData = createJobDTO(company, jobDescription, roleType, requirements, contact, experience);
    console.log(uploadData);
    SendJob(uploadData);
    navigate("/dashboard");
  };
  return (
    <div>
       <Navbar /> 
       <PageHeading title="Add Job" />
       <form className="form-style" onSubmit={handleSubmit} >
        <GradientInput
          id="company"
          type="text"
          name="Company"
          placeholder="Company"
          className="input-styles"
          onChange={(e) => setCompany(e.target.value)}
          required
        />
        <GradientInput
          id="contact"
          type="text"
          name="Email"
          placeholder="Email"
          className="input-styles"
          onChange={(e) => setContact(e.target.value)}
          required
        /> 
        <div style={{ width: "50%" ,paddingTop:"20px"}}>
          <select
            name="gender"
            value={roleType}
            onChange={handleroleTypeChange}
            className="form__field "
          >
            <option value="">Select Role Type</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Full-stack Developer">Full-stack Developer</option>
            <option value="Blockchain Developer">Blockchain Developer</option>
          </select>
        </div>
        {/* <GradientInput
          id="roleType"
          type="text"
          name="Role"
          placeholder="Role"
          className="input-styles"
          onChange={(e) => setRoleType(e.target.value)}
          required
        />  */}
        <GradientInput
          id="jobDescription"
          type="text"
          name="Job Description"
          placeholder="Job Description"
          className="input-styles"
          onChange={(e) => setJobDescription(e.target.value)}
          required
        /> 
        
        <div className="requirements">
          <h3>Requirements</h3>
          <label>
            <input
              type="checkbox"
              value="React"
              onChange={handleRequirementsChange}
            />
            React
          </label>
          <label>
            <input
              type="checkbox"
              value="Node"
              onChange={handleRequirementsChange}
            />
            Node
          </label>
          <label>
            <input
              type="checkbox"
              value="MongoDB"
              onChange={handleRequirementsChange}
            />
            MongoDB
          </label>
          <label>
            <input
              type="checkbox"
              value="Express"
              onChange={handleRequirementsChange}
            />
            Express
          </label>
          </div>
        <GradientInput
          type="range"
          min="0"
          max="15"
          name="Experience"
          placeholder="Experience"
          className="input-styles"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          required
        />
        <button type="submit" className="primary-btn">
          Submit
        </button>
      </form>
    </div>
  )
}

export default JobForm