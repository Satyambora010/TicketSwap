import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        backgroundImage: {
          'custom-image': "url('https://grabtickets.s3.ap-south-1.amazonaws.com/Ticketswap.jpg')", // Replace with your image path
        },
    }
  },
  plugins: [require("daisyui")],
}

