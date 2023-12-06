'use client';

import { useState } from "react";
import Card, { CardProps } from "@/components/Card";
import Form from "@/components/Form";
import Image from "next/image";

// Component
export default function Home() {

	let [cardProps, setCardProps] = useState<CardProps>({
		icon: null,
		heading: null,
		description: null,
		color: null
	});
	
	// Render
	return (

		<main className="homepage">

			{ /* Container */ }
			<div className="homepage-container">

				{ /* Form */ }
				<Form
					card={ cardProps }
					setCardProps={ setCardProps }
				/>

			</div>

			{ /* Result */ }
			<aside className="homepage-result">

				{ /* Picture */ }
				<Image
					className="homepage-result__picture"
					src={ '/result-background.png' }
					alt="Picture"
					fill
					priority
				/>

				{ /* Overlay */ }
				<div
					className="homepage-result__overlay"
					style={ { backgroundColor: cardProps.color || '#3643B2' } }
				></div>

				{ /* Card */ }
				<Card
					icon={ cardProps.icon }
					heading={ cardProps.heading }
					description={ cardProps.description }
					color={ cardProps.color || '#3643B2' }
				/>

			</aside>

		</main>

	);

}