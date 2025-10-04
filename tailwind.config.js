// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // เพิ่มบรรทัดนี้
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['AnakotmaiFont', 'ui-sans-serif', 'system-ui'],
        // หากต้องการใช้ชื่ออื่นก็สามารถเพิ่มตรงนี้ได้ เช่น
        // anakotmai: ['AnakotmaiFont', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};
