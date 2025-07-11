/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts,jsx,tsx}",
  ],
  safelist: [
    // Background colors
    'bg-primary',
    'bg-secondary',
    'bg-accent',
    'bg-error',
    'bg-success',
    'bg-warning',

    // Text colors
    'text-content',
    'text-muted',
    'text-error',
    'text-success',
    'text-warning'
  ],
  theme: {
    extend: {
      colors: {
        // Clean color names
        'primary': 'rgb(240, 240, 240)',
        'secondary': 'rgb(255, 255, 255)',
        'accent': 'rgb(200, 200, 200)',
        'content': 'rgb(0, 0, 0)',
        'muted': 'rgb(100, 100, 100)',

        // State colors
        'error': 'rgb(220, 38, 38)',
        'success': 'rgb(22, 163, 74)',
        'warning': 'rgb(245, 158, 11)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  future: {
    hoverOnlyWhenSupported: true,
  }
}

