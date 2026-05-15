import { useState } from "react";
import { http, HttpResponse } from "msw";
import type { Meta, StoryObj } from "@storybook/react-vite";
import PostalCode from "./PostalCode";

const mockLocalities = [
    {
        postalCode: "8001",
        name: "Zürich",
    },
    {
        postalCode: "8002",
        name: "Zürich",
    },
    {
        postalCode: "8003",
        name: "Zürich",
    },
    {
        postalCode: "8400",
        name: "Winterthur",
    },
    {
        postalCode: "3000",
        name: "Bern",
    },
    {
        postalCode: "4001",
        name: "Basel",
    },
    {
        postalCode: "6003",
        name: "Luzern",
    },
];

const meta = {
    title: "Components/PostalCode",
    component: PostalCode,
    parameters: {
        layout: "centered",
        msw: {
            handlers: [
                http.get("https://openplzapi.org/ch/Localities", ({ request }) => {
                    const url = new URL(request.url);
                    const postalCode = url.searchParams.get("postalCode");
                    const locality = url.searchParams.get("locality");

                    const result = mockLocalities.filter((item) => {
                        if (postalCode) {
                            return item.postalCode.startsWith(postalCode);
                        }

                        if (locality) {
                            return item.name
                                .toLowerCase()
                                .includes(locality.toLowerCase());
                        }

                        return true;
                    });

                    return HttpResponse.json(result);
                }),
            ],
        },
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
            table: {
                disable: true,
            },
        },
        onValueChange: {
            action: "value changed",
        },
        onSuggestionSelect: {
            action: "suggestion selected",
        },
    },
    args: {
        label: "PLZ oder Ort",
        name: "postalCode",
        placeholder: "z.B. 8001 oder Zürich",
        variant: "default",
        disabled: false,
        required: false,
    },
    decorators: [
        (Story) => (
            <div style={{ width: "360px" }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof PostalCode>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: "PLZ oder Ort",
        name: "postalCodeDefault",
        variant: "default",
    },
};

export const SearchByPostalCode: Story = {
    args: {
        label: "PLZ suchen",
        name: "postalCodeSearch",
        placeholder: "Tippe z.B. 800",
        variant: "default",
    },
};

export const SearchByLocality: Story = {
    args: {
        label: "Ort suchen",
        name: "localitySearch",
        placeholder: "Tippe z.B. Zürich",
        variant: "default",
    },
};

export const WithError: Story = {
    args: {
        label: "PLZ oder Ort",
        name: "postalCodeError",
        variant: "default",
        error: "Bitte gib eine gültige Schweizer PLZ ein.",
    },
};

export const Disabled: Story = {
    args: {
        label: "PLZ oder Ort",
        name: "postalCodeDisabled",
        placeholder: "Nicht verfügbar",
        variant: "default",
        disabled: true,
    },
};

export const Glassy: Story = {
    args: {
        label: "PLZ oder Ort",
        name: "postalCodeGlassy",
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
        label: "PLZ oder Ort",
        name: "postalCodeGlassyError",
        variant: "glassy",
        error: "Diese PLZ wurde nicht gefunden.",
    },
    globals: {
        backgrounds: {
            value: "dark",
        },
    },
};

export const Controlled: Story = {
    render: () => {
        const [value, setValue] = useState("");

        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                }}
            >
                <PostalCode
                    label="PLZ oder Ort"
                    name="postalCodeControlled"
                    value={value}
                    onValueChange={setValue}
                    onSuggestionSelect={(suggestion) => {
                        setValue(suggestion.label);
                    }}
                />

                <span
                    style={{
                        fontSize: "14px",
                        color: "#5b5a5a",
                    }}
                >
                    Aktueller Wert: {value || "Noch keine Eingabe"}
                </span>
            </div>
        );
    },
};
