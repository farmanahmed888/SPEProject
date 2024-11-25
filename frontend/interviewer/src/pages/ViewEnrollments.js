import React from 'react'
import Navbar from '../components/Navbar'
import PageHeading from '../components/PageHeading'
import Table from '../components/Table';
const ViewEnrollments = () => {
    const columns = ["Questions"];
    const data = [
        { Questions: "What is your name?" },
        { Questions: "What is your age?" },
        { Questions: "What is your profession?" }
    ];
  return (
    <div><Navbar /> 
       <PageHeading title="View Enrollments" />
        <Table columns={columns} data={data}/>
    </div>
  )
}

export default ViewEnrollments