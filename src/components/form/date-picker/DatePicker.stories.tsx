import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import DatePicker from "./DatePicker";

const meta = {
    title: "Components/DatePicker",
    component: DatePicker,
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
            table: {
                disable: true,
            },
        },
        minDate: {
            table: {
                disable: true,
            },
        },
        maxDate: {
            table: {
                disable: true,
            },
        },
        onDateChange: {
            action: "date changed",
        },
        onBlur: {
            action: "blurred",
        },
    },
    args: {
        label: "Geburtsdatum",
        name: "birthday",
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
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: "Geburtsdatum",
        name: "birthdayDefault",
        variant: "default",
    },
};

export const WithValue: Story = {
    args: {
        label: "Geburtsdatum",
        name: "birthdayWithValue",
        value: new Date(1990, 4, 15),
        variant: "default",
    },
};

export const WithMinAndMaxDate: Story = {
    args: {
        label: "Lieferdatum",
        name: "deliveryDate",
        value: new Date(2026, 4, 20),
        minDate: new Date(2026, 4, 15),
        maxDate: new Date(2026, 5, 15),
        variant: "default",
    },
};

export const Required: Story = {
    args: {
        label: "Geburtsdatum",
        name: "birthdayRequired",
        required: true,
        variant: "default",
    },
};

export const Error: Story = {
    args: {
        label: "Geburtsdatum",
        name: "birthdayError",
        error: "Bitte wähle ein gültiges Datum aus.",
        variant: "default",
    },
};

export const Disabled: Story = {
    args: {
        label: "Geburtsdatum",
        name: "birthdayDisabled",
        value: new Date(1990, 4, 15),
        disabled: true,
        variant: "default",
    },
};

export const Glassy: Story = {
    args: {
        label: "Geburtsdatum",
        name: "birthdayGlassy",
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
        label: "Geburtsdatum",
        name: "birthdayGlassyWithValue",
        value: new Date(1990, 4, 15),
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
        label: "Geburtsdatum",
        name: "birthdayGlassyError",
        error: "Dieses Datum sieht verdächtig nach Zeitreise aus.",
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
        label: "Geburtsdatum",
        name: "birthdayGlassyDisabled",
        value: new Date(1990, 4, 15),
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
        const [date, setDate] = useState<Date | null>(new Date(1990, 4, 15));

        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                }}
            >
                <DatePicker
                    label="Geburtsdatum"
                    name="birthdayControlled"
                    value={date}
                    onDateChange={setDate}
                    maxDate={new Date()}
                />

                <span
                    style={{
                        fontSize: "14px",
                        color: "#5b5a5a",
                    }}
                >
                    Aktueller Wert:{" "}
                    {date ? date.toLocaleDateString("de-CH") : "Kein Datum gewählt"}
                </span>
            </div>
        );
    },
};

export const ControlledGlassy: Story = {
    render: () => {
        const [date, setDate] = useState<Date | null>(new Date(1990, 4, 15));

        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                }}
            >
                <DatePicker
                    label="Geburtsdatum"
                    name="birthdayControlledGlassy"
                    value={date}
                    onDateChange={setDate}
                    maxDate={new Date()}
                    variant="glassy"
                />

                <span
                    style={{
                        fontSize: "14px",
                        color: "#ffffff",
                    }}
                >
                    Aktueller Wert:{" "}
                    {date ? date.toLocaleDateString("de-CH") : "Kein Datum gewählt"}
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
