import React from 'react'
import Navbar from '../components/Navbar'
import PageHeading from '../components/PageHeading'
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';
import './css/displayresults.css';
const DisplayResult = () => {
  const location = useLocation();
    const [results, setResults] = useState({ positiveFeedback: '', negativeFeedback: '' });

    useEffect(() => {
        const fetchData = async () => {
            const { enrollId } = location.state || {};
            const response = await axios.get(`${BASE_URL}/interviewer/result/${enrollId}`);
            setResults(response.data);
        }
        fetchData();
    }, [location.state]);
  return (
    <div>
        <Navbar /> 
        {results ? (
          <div>
            <PageHeading title={`Results`} />
              <br/>
            <PageHeading title="Positive Feedback" />
            <div className="form-style">{results.positiveFeedback}</div>
            <PageHeading title="Negative Feedback" />
            <div className={"form-style"}>{results.negativeFeedback}</div>
          </div>
        ) : (
          <p>No data</p>
        )}
    </div>
  )
}

export default DisplayResult