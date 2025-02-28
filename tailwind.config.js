// tailwind.config.js
module.exports = {
  content: [
    "./build/**/*.{html,js,jsx,ts,tsx}",
    "./src/**/*.{html,js,jsx,ts,tsx}",  // รวมไฟล์ทุกประเภทที่ใช้ Tailwind
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ['MyCustomFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
