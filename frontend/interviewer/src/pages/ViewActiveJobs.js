import React from 'react'
import Navbar from '../components/Navbar'
import PageHeading from '../components/PageHeading'
import Table from '../components/Table';
const ViewActiveJobs = () => {
    const columns = ["Name", "Date", "Status"];
    const data = [
        { Name: "John Doe", Date: "2021-09-01", Status: "Completed" },
        { Name: "Jane Doe", Date: "2021-09-02", Status: "Completed" },
        { Name: "John Smith", Date: "2021-09-03", Status: "Completed" }
    ];
  return (
    <div>
        <Navbar /> 
       <PageHeading title="View Active Jobs" />
        <Table columns={columns} data={data}/>
    </div>
  )
}

export default ViewActiveJobs