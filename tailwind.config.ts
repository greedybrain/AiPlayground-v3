import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#00E3FF",
                secondary: "#2F2549",
                tertiary: "#D8F055",
                link: "#2d74c8",
                reddit: "#ff4600",
                facebook: "#2AA4F4",
                discord: "#6d85d1",
            },
            boxShadow: {
                neobrut1: "1px 2px 0 0 #2F2549",
                neobrut2: "2px 3px 0 1px #2F2549",
                neobrut3: "3px 4px 0 2px #2F2549",
            },
            backgroundImage: {
                "shadow-gradient": "linear-gradient(180deg, #2F2549, darkgray)",
            },
            screens: {
                "550>": "550px",
                "900>": "900px",
                "1200>": "1200px",
                "400>": "400px",
            },
        },
    },
    plugins: [],
};
export default config;
