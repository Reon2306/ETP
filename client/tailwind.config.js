// tailwind.config.js (ESM syntax)
import defaultTheme from "tailwindcss/defaultTheme";
import animate from "tailwindcss-animate";

export default {
    darkMode: "class", // Enable class-based dark mode
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Geist", ...defaultTheme.sans],
                mono: ["Geist Mono", ...defaultTheme.mono],
            },
            colors: {
                background: "oklch(0.98 0 0)",        // clean off-white neutral
                foreground: "oklch(0.15 0 0)",        // dark text
                card: "oklch(1 0 0)",                 // white card
                "card-foreground": "oklch(0.15 0 0)",
                input: "oklch(0.95 0 0)",
                border: "oklch(0.92 0 0)",
                ring: "oklch(0.35 0.15 280)",          // deep purple/blue focus ring
                primary: "oklch(0.35 0.15 280)",       // deep blue/purple primary
                "primary-foreground": "oklch(0.98 0 0)", // light text on primary
                secondary: "oklch(0.5 0.12 260)",
                "secondary-foreground": "oklch(0.98 0 0)",
                accent: "oklch(0.6 0.18 280)",
                "accent-foreground": "oklch(0.98 0 0)",
                destructive: "oklch(0.577 0.245 27.325)",
                "destructive-foreground": "oklch(0.577 0.245 27.325)",
                muted: "oklch(0.92 0 0)",
                "muted-foreground": "oklch(0.5 0 0)",
            },
            borderRadius: {
                sm: "var(--radius-sm)",
                DEFAULT: "var(--radius-md)",
                md: "var(--radius-md)",
                lg: "var(--radius-lg)",
                xl: "var(--radius-xl)",
            },
        },
    },
    plugins: [animate],
};
