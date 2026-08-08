import {useState} from "react";
import type {Meta, StoryObj} from "@storybook/react-vite";
import {StarRating} from "./star-rating";

const colorTokenOptions = [
    "--color-gold-default",
    "--color-juice-sugarcane",
    "--color-juice-tamarind",
    "--color-juice-guarana",
    "--color-juice-icetea",
] as const;

const meta = {
    title: "Components/StarRating",
    component: StarRating,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        value: {
            control: "number",
        },
        max: {
            control: "number",
        },
        readOnly: {
            control: "boolean",
        },
        reviewCount: {
            control: "number",
        },
        colorToken: {
            control: "select",
            options: colorTokenOptions,
        },
        onChange: {
            action: "changed",
        },
    },
    args: {
        value: 3,
        max: 5,
        readOnly: false,
        reviewCount: 23,
    },
} satisfies Meta<typeof StarRating>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoColorToken: Story = {
    args: {
        value: 3,
        max: 5,
        readOnly: false,
        reviewCount: 23,
    },
};

export const Sugarcane: Story = {
    args: {
        value: 3,
        colorToken: "--color-juice-sugarcane",
        reviewCount: 23,
    },
};

export const Tamarind: Story = {
    args: {
        value: 3,
        colorToken: "--color-juice-tamarind",
        reviewCount: 23,
    },
};

export const Guarana: Story = {
    args: {
        value: 3,
        colorToken: "--color-juice-guarana",
        reviewCount: 23,
    },
};

export const Icetea: Story = {
    args: {
        value: 3,
        colorToken: "--color-juice-icetea",
        reviewCount: 23,
    },
};

export const ReadOnly: Story = {
    args: {
        value: 4,
        readOnly: true,
        reviewCount: 23,
    },
};

export const Controlled: Story = {
    render: (args) => {
        const Demo = () => {
            const [value, setValue] = useState(args.value ?? 0);

            return (
                <div style={{display: "flex", flexDirection: "column", gap: "12px"}}>
                    <StarRating {...args} value={value} onChange={setValue} />
                    <span style={{fontSize: "14px", color: "#5b5a5a"}}>
                        Aktueller Wert: {value}
                    </span>
                </div>
            );
        };

        return <Demo/>;
    },
};
