import "../src/styles/index.css";
import type { Preview } from "@storybook/react-vite";

const preview: Preview = {
    parameters: {
        layout: "centered",
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        backgrounds: {
            options: {
                light: {
                    name: "Light",
                    value: "#ffffff",
                },
                dark: {
                    name: "Dark",
                    value: "#9bad30",
                },
            },
        },
    },
    initialGlobals: {
        backgrounds: {
            value: "light",
        },
    },
};

export default preview;
