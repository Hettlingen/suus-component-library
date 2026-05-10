import type { Meta, StoryObj } from "@storybook/react-vite";
import InputButton from "./InputButton";

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
} satisfies Meta<typeof InputButton>;

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
    }
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
        disabled: true
    }
};
