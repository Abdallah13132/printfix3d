/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        name: "Bluewave",
        fontFamily: {
            sans: ['Open Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        },
        extend: {
            fontFamily: {
                title: ["Lato", "ui-sans-serif", "system-ui", "sans-serif", "\"Apple Color Emoji\"", "\"Segoe UI Emoji\"", "\"Segoe UI Symbol\"", "\"Noto Color Emoji\""],
                body: ["Open Sans", "ui-sans-serif", "system-ui", "sans-serif", "\"Apple Color Emoji\"", "\"Segoe UI Emoji\"", "\"Segoe UI Symbol\"", "\"Noto Color Emoji\""],
            },
            colors: {
                neutral: {
                    50: "#f7f7f7",
                    100: "#eeeeee",
                    200: "#e0e0e0",
                    300: "#cacaca",
                    400: "#b1b1b1",
                    500: "#999999",
                    600: "#7f7f7f",
                    700: "#676767",
                    800: "#545454",
                    900: "#464646",
                    950: "#282828"
                },
                primary: {
                    50: 'var(--color-primary-50)',
                    100: 'var(--color-primary-100)',
                    200: 'var(--color-primary-200)',
                    300: 'var(--color-primary-300)',
                    400: 'var(--color-primary-400)',
                    500: 'var(--color-primary-500)',
                    600: 'var(--color-primary-600)',
                    700: 'var(--color-primary-700)',
                    800: 'var(--color-primary-800)',
                    900: 'var(--color-primary-900)',
                    DEFAULT: 'var(--color-primary-500)'
                }
            },
        },
        fontSize: {
            xs: ["12px", {"lineHeight": "19.200000000000003px"}],
            sm: ["14px", {"lineHeight": "21px"}],
            base: ["16px", {"lineHeight": "25.6px"}],
            lg: ["18px", {"lineHeight": "27px"}],
            xl: ["20px", {"lineHeight": "28px"}],
            "2xl": ["24px", {"lineHeight": "31.200000000000003px"}],
            "3xl": ["30px", {"lineHeight": "36px"}],
            "4xl": ["36px", {"lineHeight": "41.4px"}],
            "5xl": ["48px", {"lineHeight": "52.800000000000004px"}],
            "6xl": ["60px", {"lineHeight": "66px"}],
            "7xl": ["72px", {"lineHeight": "75.60000000000001px"}],
            "8xl": ["96px", {"lineHeight": "100.80000000000001px"}],
            "9xl": ["128px", {"lineHeight": "134.4px"}]
        },
        borderRadius: {
            none: "0px",
            sm: "6px",
            DEFAULT: "12px",
            md: "18px",
            lg: "24px",
            xl: "36px",
            "2xl": "48px",
            "3xl": "72px",
            full: "9999px"
        },
        spacing: {
            "0": "0px",
            "1": "4px",
            "2": "8px",
            "3": "12px",
            "4": "16px",
            "5": "20px",
            "6": "24px",
            "7": "28px",
            "8": "32px",
            "9": "36px",
            "10": "40px",
            "11": "44px",
            "12": "48px",
            "14": "56px",
            "16": "64px",
            "20": "80px",
            "24": "96px",
            "28": "112px",
            "32": "128px",
            "36": "144px",
            "40": "160px",
            "44": "176px",
            "48": "192px",
            "52": "208px",
            "56": "224px",
            "60": "240px",
            "64": "256px",
            "72": "288px",
            "80": "320px",
            "96": "384px",
            px: "1px",
            "0.5": "2px",
            "1.5": "6px",
            "2.5": "10px",
            "3.5": "14px"
        }
    },
    plugins: [],
    important: true
}