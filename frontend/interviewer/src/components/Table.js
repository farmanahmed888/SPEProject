import React from "react";
import "./css/table.css";
import axios from "axios";
import { BASE_URL } from "../config";

const Table = ({ columns, data }) => {
  const handleCloseJob = async(id) => {
    // Handle the close job action here
    console.log(`Closing job with id: ${id}`);
	await axios.post(`${BASE_URL}/interviewer/close-job/${id}`);
  	alert("Job opening closed");
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>
                  {column === "Close Job" ? (
                    <button className="small-primary-btn" onClick={() => handleCloseJob(row.id)}>Close Job</button>
                  ) : (
                    row[column]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;