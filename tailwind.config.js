// tailwind.config.js
module.exports = {
  content: [
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
