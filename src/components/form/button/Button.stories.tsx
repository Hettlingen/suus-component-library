import type { Meta, StoryObj } from "@storybook/react-vite";
import Button from "./Button";

const meta = {
    title: "Components/Button",
    component: Button,
    parameters: {
        layout: "centered"
    },
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: ["primary", "secondary"]
        },
        disabled: {
            control: "boolean"
        },
        label: {
            control: "text"
        },
        colorToken: {
            control: "select",
            options: [
                "--colors-juice-sugarcane",
                "--colors-juice-tamarind",
                "--colors-juice-guava",
                "--colors-juice-icetea"
            ]
        }
    }
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        label: "In den Warenkorb",
        variant: "primary",
        colorToken: "--colors-juice-sugarcane"
    }
};

export const Secondary: Story = {
    args: {
        label: "Mehr erfahren",
        variant: "secondary"
    },
    decorators: [
        (Story) => (
            <div style={{ backgroundColor: "#ffffff", padding: "2rem" }}>
                <Story />
            </div>
        )
    ]
};

export const Disabled: Story = {
    args: {
        label: "Nicht verfügbar",
        variant: "primary",
        disabled: true
    }
};

export const Icon: Story = {
    args: {
        label: "Nicht verfügbar",
        variant: "primary",
        disabled: false,
        colorToken: "--colors-juice-tamarind",
        icon: (
            <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                aria-hidden="true"
            >
                <path
                    d="M6 6h15l-1.5 9h-12L6 6Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                />
                <path
                    d="M6 6 5.3 3H3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
                <circle cx="9" cy="20" r="1.5" fill="currentColor" />
                <circle cx="17" cy="20" r="1.5" fill="currentColor" />
            </svg>
        ),
    }
};
