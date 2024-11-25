import React from 'react'
import "./css/table.css"
const Table = ({ columns, data }) => {
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
								<td key={colIndex}>{row[column]}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Table