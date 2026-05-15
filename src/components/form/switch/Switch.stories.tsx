import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Switch from "./Switch";

const meta = {
    title: "Components/Switch",
    component: Switch,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        name: {
            control: "text",
        },
        label: {
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
        name: "newsletter",
        label: "Newsletter abonnieren",
        variant: "default",
        disabled: false,
        required: false,
    },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        name: "newsletterDefault",
        label: "Newsletter abonnieren",
        variant: "default",
    },
};

export const Checked: Story = {
    args: {
        name: "newsletterChecked",
        label: "Newsletter abonnieren",
        variant: "default",
        defaultChecked: true,
    },
};

export const Disabled: Story = {
    args: {
        name: "newsletterDisabled",
        label: "Newsletter nicht verfügbar",
        variant: "default",
        disabled: true,
    },
};

export const DisabledChecked: Story = {
    args: {
        name: "newsletterDisabledChecked",
        label: "Newsletter bereits aktiviert",
        variant: "default",
        disabled: true,
        defaultChecked: true,
    },
};

export const Error: Story = {
    args: {
        name: "newsletterError",
        label: "Newsletter abonnieren",
        variant: "default",
        error: "Bitte bestätige deine Auswahl.",
    },
};

export const WithoutLabel: Story = {
    args: {
        name: "switchWithoutLabel",
        variant: "default",
    },
};

export const Glassy: Story = {
    args: {
        name: "newsletterGlassy",
        label: "Newsletter abonnieren",
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
        name: "newsletterGlassyChecked",
        label: "Newsletter abonnieren",
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
        name: "newsletterGlassyDisabled",
        label: "Newsletter nicht verfügbar",
        variant: "glassy",
        disabled: true,
    },
    globals: {
        backgrounds: {
            value: "dark",
        },
    },
};

export const GlassyDisabledChecked: Story = {
    args: {
        name: "newsletterGlassyDisabledChecked",
        label: "Newsletter bereits aktiviert",
        variant: "glassy",
        disabled: true,
        defaultChecked: true,
    },
    globals: {
        backgrounds: {
            value: "dark",
        },
    },
};

export const GlassyError: Story = {
    args: {
        name: "newsletterGlassyError",
        label: "Newsletter abonnieren",
        variant: "glassy",
        error: "Bitte bestätige deine Auswahl.",
    },
    globals: {
        backgrounds: {
            value: "dark",
        },
    },
};

export const Controlled: Story = {
    render: () => {
        const [isActive, setIsActive] = useState(false);

        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                }}
            >
                <Switch
                    name="controlledSwitch"
                    label={isActive ? "Aktiv" : "Inaktiv"}
                    checked={isActive}
                    onChange={(event) => setIsActive(event.target.checked)}
                />

                <span
                    style={{
                        fontSize: "14px",
                        color: "#5b5a5a",
                    }}
                >
                    Aktueller Wert: {isActive ? "true" : "false"}
                </span>
            </div>
        );
    },
};
