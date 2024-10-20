/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					1: 'hsl(var(--chart-1))',
					2: 'hsl(var(--chart-2))',
					3: 'hsl(var(--chart-3))',
					4: 'hsl(var(--chart-4))',
					5: 'hsl(var(--chart-5))',
				},

        darkColor: '#53423A',
        textBlack: '#1a1a1a',
        hoverOrange: '#ff5200',
        blackOpacity:'#BFBFBF',
				bgWhite: '#F5F6FB',
				grayColor: '#808080',
				opacityBackground: 'rgba(0, 0, 0, 0.8)',
				whiteBoard: '#f2f4fa',
				blackBg: '#282828',
				hoverGray: '#E6E6E6'
			},
			fontFamily: {
				roboto: ['Roboto', 'sans-serif'],
				opensans: ['Open Sans', 'sans-serif'],
				opensansCondensed: ['Open Sans Condensed', 'sans-serif'],
				opensansSemicondensed: ['Open Sans SemiCondensed', 'sans-serif'],
			},
			fontWeight: {
				thin: 100,
				light: 300,
				regular: 400,
				medium: 500,
				semibold: 600,
				bold: 700,
				extrabold: 800,
				black: 900,
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
	darkMode: ['class'],
}