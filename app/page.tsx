'use client';

import React, { useRef, useState } from "react";
import Card, { CardProps } from "@/components/Card";
import Form from "@/components/Form";
import Image from "next/image";
import HTML_TO_CANVAS from 'html2canvas';

// Component
export default function Home() {

	let [cardProps, setCardProps] = useState<CardProps>({
		icon: null,
		heading: null,
		description: null,
		color: null
	});

	const CARD_ELEMENT_REFERENCE = useRef<HTMLElement>(null);
	
	// Render
	return (

		<main className="homepage">

			{ /* Container */ }
			<div className="homepage-container">

				{ /* Form */ }
				<Form
					card={ cardProps }
					setCardProps={ setCardProps }
					downloadCard={ downloadCard }
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
					elementReference={ CARD_ELEMENT_REFERENCE }
				/>

			</aside>

		</main>

	);

	// Function which downloads locally
	// the result Card as an image
	function downloadCard(): void {

		if (!CARD_ELEMENT_REFERENCE?.current) return;
		const CARD_ELEMENT = CARD_ELEMENT_REFERENCE.current;
		
		HTML_TO_CANVAS(CARD_ELEMENT)
			.then(executeDownload)
			.catch(ERROR => console.error('Download failed. An error occurred. ' + ERROR));

	}

}

function executeDownload(IMAGE: HTMLCanvasElement): void {

	// Generate the required information
	const { IMAGE_DATA_URL, IMAGE_NAME } = generateImageMetaData(IMAGE);

	// Generate an anchor HTML element
	const ANCHOR_ELEMENT = createAnchorElement(IMAGE_DATA_URL, IMAGE_NAME) as HTMLAnchorElement;

	// Simulate a "click" on the anchor HTML element
	simulateAnchorClick(ANCHOR_ELEMENT);

	// Delete the anchor HTML element from the page
	ANCHOR_ELEMENT.remove();

}

function generateImageMetaData(IMAGE: HTMLCanvasElement): { IMAGE_DATA_URL: string, IMAGE_NAME: string } {

	const IMAGE_DATA_URL = IMAGE.toDataURL();
	const IMAGE_NAME = 'B-day Card';

	return { IMAGE_DATA_URL, IMAGE_NAME };

}

function createAnchorElement(FILE_URL: string, FILE_NAME: string): HTMLAnchorElement {

	const ANCHOR_ELEMENT = document.createElement('a') as HTMLAnchorElement;
	ANCHOR_ELEMENT.href = FILE_URL;
	ANCHOR_ELEMENT.download = FILE_NAME;
	ANCHOR_ELEMENT.style.display = 'none';

	return ANCHOR_ELEMENT;

}

function simulateAnchorClick(ANCHOR_ELEMENT: HTMLAnchorElement): void {

	const BODY_ELEMENT: HTMLElement = document.body;
	BODY_ELEMENT.appendChild(ANCHOR_ELEMENT);

	ANCHOR_ELEMENT.click();

}