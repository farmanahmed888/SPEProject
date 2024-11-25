import React from 'react'

const FeatureCard = (props) => {
  return (
    <div class={props.cardClass}>
			<div class="contents">
				<h1>{props.title}</h1>
				<p>{props.count}</p>
			</div>
		</div>
  )
}

export default FeatureCard