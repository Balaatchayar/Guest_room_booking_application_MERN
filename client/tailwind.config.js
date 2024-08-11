/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundColor: {
                primary: "#002366", // Dark Royal Blue
            },
            fontFamily: {
                dance: "Dancing Script",
            },
        },
    },
    plugins: [],
};
