import React from "react";
import "./css/common.css";
function PageHeading(props) {
	return (
		<div className="page-heading">
			<h2>
				<span>{props.title}</span>
			</h2>
		</div>
	);
}

export default PageHeading;