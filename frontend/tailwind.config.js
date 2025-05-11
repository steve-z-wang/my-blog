/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts,jsx,tsx}",
  ],
  safelist: [
    // Background colors
    'bg-background',
    'bg-surface',
    'bg-surfaceAlt',
    'bg-error',
    'bg-success',
    'bg-warning',
    'bg-text',
    'bg-muted',
    
    // Text colors
    'text-background',
    'text-surface',
    'text-surfaceAlt',
    'text-error',
    'text-success',
    'text-warning',
    'text-text',
    'text-muted'
  ],
  theme: {
    extend: {
      colors: {
        // Core brand colors
        // not using these colors
        // primary: '#2563eb',    // Main action
        // secondary: '#64748b',  // Secondary UI actions

        // Surfaces & backgrounds
        background: 'rgb(245, 245, 245)', // App/page background
        surface: 'rgb(255, 255, 255)',    // Cards, panels
        'surfaceAlt': 'rgb(214, 214, 214)', // Cards, panels

        // Text colors
        text: 'rgb(30, 30, 30)',       // Main text
        muted: 'rgb(108, 108, 108)',      // Subtle text, labels

        // States
        error: 'rgb(220, 38, 38)',      // Form errors, alerts
        success: 'rgb(22, 163, 74)',    // Confirmations
        warning: 'rgb(245, 158, 11)',    // Cautions
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

