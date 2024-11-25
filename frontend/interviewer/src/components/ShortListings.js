import React from 'react'
import ShortListingsCard from './ShortListingsCard'
const ShortListings = (props) => {
    return (
		<div class={props.listingClass}>
			<h2>{props.title}</h2>
			<ul class="cards">
				<ShortListingsCard
					initials="AB"
					name="Abhishek Gupta"
					score="23"
				/>
				<ShortListingsCard
					initials="AB"
					name="Abhishek Gupta"
					score="23"
				/>
				<ShortListingsCard
					initials="AB"
					name="Abhishek Gupta"
					score="23"
				/>
			</ul>
		</div>
	);
}

export default ShortListings