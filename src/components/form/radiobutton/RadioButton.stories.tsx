import type { Meta, StoryObj } from "@storybook/react-vite";
import RadioButton from "./RadioButton";

const deliveryOptions = [
    {
        label: "Abholung",
        value: "pickup",
        description: "Du holst deine Bestellung selbst ab.",
    },
    {
        label: "Lieferung",
        value: "delivery",
        description: "Wir liefern deine Bestellung zu dir.",
    },
];

const paymentOptions = [
    {
        label: "TWINT",
        value: "twint",
        description: "Schnell und einfach mit TWINT bezahlen.",
    },
    {
        label: "Kreditkarte",
        value: "card",
        description: "Bezahle sicher mit Visa oder Mastercard.",
    },
    {
        label: "Rechnung",
        value: "invoice",
        description: "Du erhältst die Rechnung per E-Mail.",
    },
];

const meta = {
    title: "Form/RadioButton",
    component: RadioButton,
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
        defaultChecked: {
            table: {
                disable: true,
            },
        },
        checked: {
            table: {
                disable: true,
            },
        },
        value: {
            control: "text",
        },
        onChange: {
            action: "changed",
        },
    },
    args: {
        label: "Lieferart",
        name: "deliveryType",
        options: deliveryOptions,
        variant: "default",
        disabled: false,
        required: false,
    },
} satisfies Meta<typeof RadioButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: "Lieferart",
        name: "deliveryTypeDefault",
        options: deliveryOptions,
        variant: "default",
    },
};

export const DefaultSelected: Story = {
    args: {
        label: "Lieferart",
        name: "deliveryTypeSelected",
        options: deliveryOptions,
        variant: "default",
        defaultValue: "pickup",
    },
};

export const DefaultError: Story = {
    args: {
        label: "Lieferart",
        name: "deliveryTypeError",
        options: deliveryOptions,
        variant: "default",
        error: "Bitte wähle eine Lieferart aus.",
    },
};

export const DefaultDisabled: Story = {
    args: {
        label: "Lieferart",
        name: "deliveryTypeDisabled",
        options: deliveryOptions,
        variant: "default",
        disabled: true,
        defaultValue: "delivery",
    },
};

export const ThreeOptions: Story = {
    args: {
        label: "Zahlungsart",
        name: "paymentType",
        options: paymentOptions,
        variant: "default",
        defaultValue: "twint",
    },
};

export const WithoutDescription: Story = {
    args: {
        label: "Geschmack",
        name: "flavour",
        options: [
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
        ],
        variant: "default",
        defaultValue: "sugarcane",
    },
};

export const WithoutLabel: Story = {
    args: {
        name: "withoutLabel",
        options: deliveryOptions,
        variant: "default",
        defaultValue: "pickup",
    },
};

export const Glassy: Story = {
    args: {
        label: "Lieferart",
        name: "deliveryTypeGlassy",
        options: deliveryOptions,
        variant: "glassy",
    },
    globals: {
        backgrounds: {
            value: "dark",
        },
    },
};

export const GlassySelected: Story = {
    args: {
        label: "Lieferart",
        name: "deliveryTypeGlassySelected",
        options: deliveryOptions,
        variant: "glassy",
        defaultValue: "delivery",
    },
    globals: {
        backgrounds: {
            value: "dark",
        },
    },
};

export const GlassyError: Story = {
    args: {
        label: "Lieferart",
        name: "deliveryTypeGlassyError",
        options: deliveryOptions,
        variant: "glassy",
        error: "Bitte wähle eine Lieferart aus.",
    },
    globals: {
        backgrounds: {
            value: "dark",
        },
    },
};

export const GlassyDisabled: Story = {
    args: {
        label: "Lieferart",
        name: "deliveryTypeGlassyDisabled",
        options: deliveryOptions,
        variant: "glassy",
        disabled: true,
        defaultValue: "pickup",
    },
    globals: {
        backgrounds: {
            value: "dark",
        },
    },
};

export const GlassyThreeOptions: Story = {
    args: {
        label: "Zahlungsart",
        name: "paymentTypeGlassy",
        options: paymentOptions,
        variant: "glassy",
        defaultValue: "card",
    },
    globals: {
        backgrounds: {
            value: "dark",
        },
    },
};
