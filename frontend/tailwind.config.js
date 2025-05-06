/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core brand colors
        primary: '#2563eb',    // Main action
        secondary: '#64748b',  // Secondary UI actions

        // Surfaces & backgrounds
        background: '#ffffff', // App/page background
        surface: '#f9fafb',    // Cards, panels

        // Text colors
        text: '#111827',       // Main text
        muted: '#6b7280',      // Subtle text, labels

        // States
        error: '#dc2626',      // Form errors, alerts
        success: '#16a34a',    // Confirmations
        warning: '#f59e0b',    // Cautions
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

