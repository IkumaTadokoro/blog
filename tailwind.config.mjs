/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
				  DEFAULT: "hsl(var(--primary))",
				  foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
				  DEFAULT: "hsl(var(--secondary))",
				  foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
				  DEFAULT: "hsl(var(--destructive))",
				  foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
				  DEFAULT: "hsl(var(--muted))",
				  foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
				  DEFAULT: "hsl(var(--accent))",
				  foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
				  DEFAULT: "hsl(var(--popover))",
				  foreground: "hsl(var(--popover-foreground))",
				},
				card: {
				  DEFAULT: "hsl(var(--card))",
				  foreground: "hsl(var(--card-foreground))",
				},
			},
			animation: {
				'meteor-effect': 'meteor 5s linear infinite',
				"slide-top": "slideTop 0.25s ease both"
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				meteor: {
					'0%': {
						transform: 'rotate(215deg) translateX(0)',
						opacity: '1',
					},
					'70%': {
						opacity: '1',
					},
					'100%': {
						transform: 'rotate(215deg) translateX(-500px)',
						opacity: '0',
					},
				},
				slideTop: {
                    "0%": {
                        transform: "translateY(25px)"
                    },
                    "100%": {
                        transform: "translateY(0)"
                    }
                }
			},
			fontFamily: {
				sans: ['Noto Sans JP Variable', ...defaultTheme.fontFamily.sans],
				montserrat: ['Montserrat Variable', ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
    require("tailwind-gradient-mask-image")
	],
}
