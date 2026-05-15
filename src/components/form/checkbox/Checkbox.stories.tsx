import type { Meta, StoryObj } from "@storybook/react-vite";
import Checkbox from "./Checkbox";

const meta = {
    title: "Components/Checkbox",
    component: Checkbox,
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
        variant: {
            control: "select",
            options: ["default", "glassy"],
        },
        checked: {
            control: "boolean",
        },
        defaultChecked: {
            control: "boolean",
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
        onChange: {
            action: "changed",
        },
    },
    args: {
        label: "Ich akzeptiere die AGB",
        name: "terms",
        variant: "default",
        disabled: false,
        required: false,
    },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: "Ich akzeptiere die AGB",
        name: "termsDefault",
        variant: "default",
    },
};

export const Checked: Story = {
    args: {
        label: "Newsletter abonnieren",
        name: "newsletterChecked",
        variant: "default",
        defaultChecked: true,
    },
};

export const Disabled: Story = {
    args: {
        label: "Diese Option ist nicht verfügbar",
        name: "optionDisabled",
        variant: "default",
        disabled: true,
    },
};

export const DisabledChecked: Story = {
    args: {
        label: "Bereits ausgewählt, aber deaktiviert",
        name: "optionDisabledChecked",
        variant: "default",
        disabled: true,
        defaultChecked: true,
    },
};

export const Required: Story = {
    args: {
        label: "Ich akzeptiere die Datenschutzbestimmungen",
        name: "privacyRequired",
        variant: "default",
        required: true,
    },
};

export const Error: Story = {
    args: {
        label: "Ich akzeptiere die AGB",
        name: "termsError",
        variant: "default",
        error: "Du musst die AGB akzeptieren, bevor es weitergeht.",
    },
};

export const Glassy: Story = {
    args: {
        label: "Ich akzeptiere die AGB",
        name: "termsGlassy",
        variant: "glassy",
    },
    globals: {
        backgrounds: {
            value: "dark",
        },
    },
};

export const GlassyChecked: Story = {
    args: {
        label: "Newsletter abonnieren",
        name: "newsletterGlassyChecked",
        variant: "glassy",
        defaultChecked: true,
    },
    globals: {
        backgrounds: {
            value: "dark",
        },
    },
};

export const GlassyDisabled: Story = {
    args: {
        label: "Diese Option ist nicht verfügbar",
        name: "optionGlassyDisabled",
        variant: "glassy",
        disabled: true,
    },
    globals: {
        backgrounds: {
            value: "dark",
        },
    },
};

export const GlassyError: Story = {
    args: {
        label: "Ich akzeptiere die AGB",
        name: "termsGlassyError",
        variant: "glassy",
        error: "Ohne Zustimmung bleibt der Warenkorb leider im Parkmodus.",
    },
    globals: {
        backgrounds: {
            value: "dark",
        },
    },
};
