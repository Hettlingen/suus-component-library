import type { Meta, StoryObj } from "@storybook/react-vite";
import InputButton from "./input-button";

const meta = {
    title: "Components/InputButton",
    component: InputButton,
    parameters: {
        layout: "centered"
    },
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: ["primary", "secondary"]
        },
        fullWidth: {
            control: "boolean"
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
                "--colorProductSugarcane",
                "--colorProductTamarind",
                "--colorProductGuava",
                "--colorProductIcetea"
            ]
        }
    }
} satisfies Meta<typeof InputButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        label: "In den Warenkorb",
        variant: "primary",
        colorToken: "--colorProductSugarcane"
    }
};

export const Secondary: Story = {
    args: {
        label: "Mehr erfahren",
        variant: "secondary"
    }
};

export const Disabled: Story = {
    args: {
        label: "Nicht verfügbar",
        variant: "primary",
        disabled: true
    }
};

export const FullWidth: Story = {
    args: {
        label: "Weiter zur Zahlung",
        variant: "primary",
        fullWidth: true
    },
    parameters: {
        layout: "padded"
    }
};
