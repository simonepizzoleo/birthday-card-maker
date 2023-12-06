import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';
import './scss/app.scss';

// Fonts
const FIGTREE_FONT = Figtree({
	subsets: ['latin'],
	display: 'swap',
	adjustFontFallback: true,
	variable: '--font-primary'
});

// Metadata
export const metadata: Metadata = {
	title: 'Birthday Card Maker',
	description: 'Wish happy b-day to your friends with style!',
};

export default function RootLayout(
	{ children }: { children: React.ReactNode }
) {
	
	return (

		<html
			lang="en"
			className={ FIGTREE_FONT.variable }
		>

			{ /* Body */ }
			<body> { children } </body>
		
		</html>
	
	);

}