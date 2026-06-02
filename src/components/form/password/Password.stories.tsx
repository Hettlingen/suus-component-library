import type { Meta, StoryObj } from "@storybook/react-vite";
import Password from "./Password";

const meta = {
    title: "Components/Password",
    component: Password,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        label: {
            control: "text",
        },
        name: {
            control: "text",
        },
        placeholder: {
            control: "text",
        },
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
        error: {
            control: "text",
        },
        autoComplete: {
            control: "select",
            options: [
                "current-password",
                "new-password",
                "off",
            ],
        },
        defaultValue: {
            control: "text",
        },
    },
    args: {
        label: "Passwort",
        name: "password",
        placeholder: "Dein Passwort",
        variant: "default",
        disabled: false,
        required: false,
        autoComplete: "current-password",
    },
} satisfies Meta<typeof Password>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: "Passwort",
        name: "passwordDefault",
        placeholder: "Dein Passwort",
        variant: "default",
    },
};

export const WithValue: Story = {
    args: {
        label: "Passwort",
        name: "passwordWithValue",
        placeholder: "Dein Passwort",
        defaultValue: "super-secret-password",
        variant: "default",
    },
};

export const Required: Story = {
    args: {
        label: "Passwort",
        name: "passwordRequired",
        placeholder: "Dein Passwort",
        required: true,
        variant: "default",
    },
};

export const Error: Story = {
    args: {
        label: "Passwort",
        name: "passwordError",
        placeholder: "Dein Passwort",
        error: "Das Passwort muss mindestens 8 Zeichen lang sein.",
        variant: "default",
    },
};

export const Disabled: Story = {
    args: {
        label: "Passwort",
        name: "passwordDisabled",
        placeholder: "Nicht verfügbar",
        disabled: true,
        variant: "default",
    },
};

export const DisabledWithValue: Story = {
    args: {
        label: "Passwort",
        name: "passwordDisabledWithValue",
        defaultValue: "locked-password",
        disabled: true,
        variant: "default",
    },
};

export const WithoutLabel: Story = {
    args: {
        name: "passwordWithoutLabel",
        placeholder: "Passwort ohne Label",
        variant: "default",
    },
};

export const Glassy: Story = {
    args: {
        label: "Passwort",
        name: "passwordGlassy",
        placeholder: "Dein Passwort",
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
        label: "Passwort",
        name: "passwordGlassyWithValue",
        placeholder: "Dein Passwort",
        defaultValue: "super-secret-password",
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
        label: "Passwort",
        name: "passwordGlassyError",
        placeholder: "Dein Passwort",
        error: "Dieses Passwort ist noch etwas zu harmlos.",
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
        label: "Passwort",
        name: "passwordGlassyDisabled",
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
