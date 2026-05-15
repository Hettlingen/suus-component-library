import type { Meta, StoryObj } from "@storybook/react-vite";
import TextField from "./TextField";

const meta = {
    title: "Components/TextField",
    component: TextField,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: ["default", "glassy"],
        },
        disabled: {
            control: "boolean",
        },
        required: {
            control: "boolean",
        },
        label: {
            control: "text",
        },
        name: {
            control: "text",
        },
        placeholder: {
            control: "text",
        },
        error: {
            control: "text",
        },
        type: {
            control: "select",
            options: ["text", "email", "password", "number", "tel", "search"],
        },
    },
    args: {
        name: "email",
        label: "E-Mail",
        placeholder: "deine@email.ch",
        type: "text",
        variant: "default",
        disabled: false,
        required: false,
    },
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: "Vorname",
        name: "firstName",
        placeholder: "Martin",
        variant: "default",
    },
};

export const DefaultWithValue: Story = {
    args: {
        label: "E-Mail",
        name: "email",
        placeholder: "deine@email.ch",
        defaultValue: "martin@suus.ch",
        variant: "default",
    },
};

export const DefaultRequired: Story = {
    args: {
        label: "E-Mail",
        name: "emailRequired",
        placeholder: "deine@email.ch",
        required: true,
        variant: "default",
    },
};

export const DefaultError: Story = {
    args: {
        label: "E-Mail",
        name: "emailError",
        placeholder: "deine@email.ch",
        error: "Bitte gib eine gültige E-Mail-Adresse ein.",
        variant: "default",
    },
};

export const DefaultDisabled: Story = {
    args: {
        label: "E-Mail",
        name: "emailDisabled",
        placeholder: "Nicht verfügbar",
        disabled: true,
        variant: "default",
    },
};

export const Glassy: Story = {
    args: {
        label: "E-Mail",
        name: "emailGlassy",
        placeholder: "deine@email.ch",
        variant: "glassy",
    },
    globals: {
        backgrounds: {
            value: "dark",
        },
    },
};

export const GlassyWithValue: Story = {
    args: {
        label: "E-Mail",
        name: "emailGlassyValue",
        placeholder: "deine@email.ch",
        defaultValue: "martin@suus.ch",
        variant: "glassy",
    },
    globals: {
        backgrounds: {
            value: "dark",
        },
    },
};

export const GlassyError: Story = {
    args: {
        label: "E-Mail",
        name: "emailGlassyError",
        placeholder: "deine@email.ch",
        error: "Diese E-Mail-Adresse sieht etwas wild aus.",
        variant: "glassy",
    },
    globals: {
        backgrounds: {
            value: "dark",
        },
    },
};

export const GlassyDisabled: Story = {
    args: {
        label: "E-Mail",
        name: "emailGlassyDisabled",
        placeholder: "Nicht verfügbar",
        disabled: true,
        variant: "glassy",
    },
    globals: {
        backgrounds: {
            value: "dark",
        },
    },
};
