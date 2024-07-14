import { useEffect, useState } from 'react';

import { cn } from '../utils/cn';

interface MeteorsProps {
	number: number;
}

export function Meteors({ number }: MeteorsProps) {
	const meteors = new Array(number).fill(null);

	const [offset, setOffset] = useState<{
		min: number;
		max: number;
	}>({
		min: 0,
		max: 0,
	});

	const [isLightTheme, setIsLightTheme] = useState(
		document.documentElement.getAttribute('data-theme') === 'light',
	);

	useEffect(() => {
		function handler() {
			setOffset({
				min: -(window.innerWidth / 8),
				max: window.innerWidth - window.innerWidth / 8,
			});
		}

		handler();

		window.addEventListener('resize', handler);

		return () => {
			window.removeEventListener('resize', handler);
		};
	}, []);

	useEffect(() => {
		function themeChangeHandler() {
			setIsLightTheme(document.documentElement.getAttribute('data-theme') === 'light');
		}

		document.addEventListener('theme-change', themeChangeHandler);

		return () => {
			document.removeEventListener('theme-change', themeChangeHandler);
		};
	}, []);

	return (
		<div className='-z-10 absolute inset-0 h-40 w-full overflow-hidden motion-reduce:hidden'>
			{meteors.map((_el, idx) => (
				<span
					aria-hidden={true}
					key={idx}
					className={cn(
						'absolute h-0.5 w-0.5 rounded-full shadow-[0_0_0_1px_#ffffff10] motion-reduce:hidden',
						isLightTheme
							? 'rotate-[45deg] bg-blue-900/30 before:bg-gradient-to-r before:from-blue-900/30'
							: 'rotate-[215deg] bg-primary/30 before:bg-gradient-to-r before:from-primary/30',
						'before:-translate-y-[50%] before:absolute before:top-1/2 before:h-0.5 before:w-14 before:transform before:rounded-full before:to-transparent before:content-[""]',
						'animate-meteor-effect',
					)}
					style={{
						top: `${Math.floor(Math.random() * 400 - 400)}px`,
						left: `${Math.floor(Math.random() * (offset.max - offset.min) + offset.min)}px`,
						animationDelay: `${Math.random() * (0.8 - 0.2) + 0.2}s`,
						animationDuration: `${Math.floor(Math.random() * (10 - 2) + 2)}s`,
					}}
				/>
			))}
		</div>
	);
}
