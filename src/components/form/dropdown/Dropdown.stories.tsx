import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Dropdown from "./Dropdown";

const flavourOptions = [
    {
        label: "Sugarcane",
        value: "sugarcane",
    },
    {
        label: "Tamarind",
        value: "tamarind",
    },
    {
        label: "Guava",
        value: "guava",
    },
    {
        label: "Ice Tea",
        value: "icetea",
    },
];

const countryOptions = [
    {
        label: "Schweiz",
        value: "ch",
    },
    {
        label: "Deutschland",
        value: "de",
    },
    {
        label: "Österreich",
        value: "at",
    },
    {
        label: "Frankreich",
        value: "fr",
    },
];

const meta = {
    title: "Form/Dropdown",
    component: Dropdown,
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
        value: {
            control: "text",
        },
        defaultValue: {
            control: "text",
        },
        onChange: {
            action: "changed",
        },
        onBlur: {
            action: "blurred",
        },
    },
    args: {
        label: "Geschmack",
        name: "flavour",
        placeholder: "Bitte auswählen",
        options: flavourOptions,
        variant: "default",
        disabled: false,
        required: false,
    },
    decorators: [
        (Story) => (
            <div style={{ width: "320px" }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: "Geschmack",
        name: "flavourDefault",
        placeholder: "Bitte auswählen",
        options: flavourOptions,
        variant: "default",
    },
};

export const WithDefaultValue: Story = {
    args: {
        label: "Geschmack",
        name: "flavourWithDefaultValue",
        placeholder: "Bitte auswählen",
        options: flavourOptions,
        defaultValue: "tamarind",
        variant: "default",
    },
};

export const Required: Story = {
    args: {
        label: "Geschmack",
        name: "flavourRequired",
        placeholder: "Bitte auswählen",
        options: flavourOptions,
        required: true,
        variant: "default",
    },
};

export const Error: Story = {
    args: {
        label: "Geschmack",
        name: "flavourError",
        placeholder: "Bitte auswählen",
        options: flavourOptions,
        error: "Bitte wähle einen Geschmack aus.",
        variant: "default",
    },
};

export const Disabled: Story = {
    args: {
        label: "Geschmack",
        name: "flavourDisabled",
        placeholder: "Nicht verfügbar",
        options: flavourOptions,
        disabled: true,
        variant: "default",
    },
};

export const DisabledWithValue: Story = {
    args: {
        label: "Geschmack",
        name: "flavourDisabledWithValue",
        options: flavourOptions,
        defaultValue: "guava",
        disabled: true,
        variant: "default",
    },
};

export const WithoutPlaceholder: Story = {
    args: {
        label: "Land",
        name: "countryWithoutPlaceholder",
        options: countryOptions,
        variant: "default",
    },
};

export const CountrySelect: Story = {
    args: {
        label: "Land",
        name: "country",
        placeholder: "Land auswählen",
        options: countryOptions,
        defaultValue: "ch",
        variant: "default",
    },
};

export const Glassy: Story = {
    args: {
        label: "Geschmack",
        name: "flavourGlassy",
        placeholder: "Bitte auswählen",
        options: flavourOptions,
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
        label: "Geschmack",
        name: "flavourGlassyWithValue",
        placeholder: "Bitte auswählen",
        options: flavourOptions,
        defaultValue: "sugarcane",
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
        label: "Geschmack",
        name: "flavourGlassyError",
        placeholder: "Bitte auswählen",
        options: flavourOptions,
        error: "Bitte wähle einen Geschmack aus.",
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
        label: "Geschmack",
        name: "flavourGlassyDisabled",
        placeholder: "Nicht verfügbar",
        options: flavourOptions,
        disabled: true,
        variant: "glassy",
    },
    globals: {
        backgrounds: {
            value: "dark",
        },
    },
};

export const Controlled: Story = {
    render: () => {
        const [value, setValue] = useState("sugarcane");

        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                }}
            >
                <Dropdown
                    label="Geschmack"
                    name="flavourControlled"
                    placeholder="Bitte auswählen"
                    options={flavourOptions}
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                />

                <span
                    style={{
                        fontSize: "14px",
                        color: "#5b5a5a",
                    }}
                >
                    Aktueller Wert: {value || "Keine Auswahl"}
                </span>
            </div>
        );
    },
};

export const ControlledGlassy: Story = {
    render: () => {
        const [value, setValue] = useState("guava");

        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                }}
            >
                <Dropdown
                    label="Geschmack"
                    name="flavourControlledGlassy"
                    placeholder="Bitte auswählen"
                    options={flavourOptions}
                    value={value}
                    variant="glassy"
                    onChange={(event) => setValue(event.target.value)}
                />

                <span
                    style={{
                        fontSize: "14px",
                        color: "#ffffff",
                    }}
                >
                    Aktueller Wert: {value || "Keine Auswahl"}
                </span>
            </div>
        );
    },
    globals: {
        backgrounds: {
            value: "dark",
        },
    },
};
