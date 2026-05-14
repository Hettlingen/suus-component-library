import type {Meta, StoryObj} from "@storybook/react-vite";
import TextField from "./Textfield";

const meta = {
    title: "Components/Textfield",
    component: TextField,
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
        }
    }
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LightMode: Story = {
    args: {
        label: "Mehr erfahren",
        variant: "default"
    }
};

export const GlassyMode: Story = {
    args: {
        label: "Nicht verfügbar",
        variant: "glassy",
        disabled: true
    }
};

export const LightModeDisabled: Story = {
    args: {
        label: "Mehr erfahren",
        variant: "default"
    }
};

export const GlassyModeDisabled: Story = {
    args: {
        label: "Nicht verfügbar",
        variant: "glassy",
        disabled: true
    }
};
