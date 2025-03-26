import type { FC } from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

const badgeVariants = cva(
	'inline-flex justify-center items-center rounded-full whitespace-nowrap shrink-0',
	{
		variants: {
			size: {
				sm: 'text-[11px] h-5 px-[6px] tracking-wide',
				md: 'text-label-12 px-[10px] h-6 ',
				lg: 'text-label-14 h-8 px-3',
			},
			variant: {
				gray: 'bg-gray-700 text-contrast-fg',
				'gray-subtle': 'bg-gray-300 text-gray-900',
				blue: 'bg-blue-700 text-contrast-fg',
				'blue-subtle': 'bg-blue-300 text-blue-900',
				purple: 'bg-purple-700 text-contrast-fg',
				'purple-subtle': 'bg-purple-300 text-purple-900',
				amber: 'bg-amber-700 text-contrast-fg',
				'amber-subtle': 'bg-amber-300 text-amber-900',
				red: 'bg-red-700 text-contrast-fg',
				'red-subtle': 'bg-red-300 text-red-900',
				pink: 'bg-pink-700 text-contrast-fg',
				'pink-subtle': 'bg-pink-300 text-pink-900',
				green: 'bg-green-700 text-contrast-fg',
				'green-subtle': 'bg-green-300 text-green-900',
				teal: 'bg-teal-700 text-contrast-fg',
				'teal-subtle': 'bg-teal-300 text-teal-900',
				inverted: 'bg-gray-1000 text-contrast-fg',
			},
		},
		defaultVariants: {
			size: 'md',
			variant: 'gray',
		},
	},
);

export const Badge: FC<BadgeProps> = ({
	className,
	size = 'md',
	variant = 'gray',
	children,
}) => {
	return (
		<span className={`${badgeVariants({ size, variant })} ${className}`}>
			<span className='flex align-center'>{children}</span>
		</span>
	);
};
