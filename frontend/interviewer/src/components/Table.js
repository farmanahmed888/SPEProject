import React from "react";
import "./css/table.css";
import axios from "axios";
import { BASE_URL } from "../config";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Table = ({ columns, data }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state || {};

  
  const handleClick = (jobId) => {
    console.log("View Info clicked",jobId);
    navigate(`/active-jobs-view`, { state: { id: jobId } });
  }


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
                  {column === "View Info" ? (
                    <button
                      className="small-primary-btn"
                      onClick={()=>handleClick(row.id)}
                    >
                      View Info
                    </button>
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
