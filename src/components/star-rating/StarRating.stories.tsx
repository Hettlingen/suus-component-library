import {useState} from "react";
import type {Meta, StoryObj} from "@storybook/react-vite";
import {StarRating} from "./star-rating";

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
        onChange: {
            action: "changed",
        },
    },
    args: {
        value: 3,
        max: 5,
        readOnly: false,
    },
} satisfies Meta<typeof StarRating>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ReadOnly: Story = {
    args: {
        value: 4,
        readOnly: true,
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
