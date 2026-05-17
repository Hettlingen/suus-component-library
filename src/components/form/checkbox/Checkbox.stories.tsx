import type { Meta, StoryObj } from "@storybook/react-vite";
import Checkbox from "./Checkbox";

const meta = {
    title: "Components/Checkbox",
    component: Checkbox,
    parameters: {
        layout: "centered",
    },
    argTypes: {
        variant: {
            control: "select",
            options: ["default", "glassy"],
        },
    },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        name: "default",
        label: "Label",
    },
};

export const Checked: Story = {
    args: {
        name: "checked",
        label: "Label",
        defaultChecked: true,
    },
};

export const Disabled: Story = {
    args: {
        name: "disabled",
        label: "Label",
        disabled: true,
    },
};

export const DisabledChecked: Story = {
    args: {
        name: "disabled-checked",
        label: "Label",
        disabled: true,
        defaultChecked: true,
    },
};

export const Error: Story = {
    args: {
        name: "error",
        label: "Label",
        error: "Bitte auswählen.",
    },
};

export const ErrorChecked: Story = {
    args: {
        name: "error-checked",
        label: "Label",
        error: "Bitte auswählen.",
        defaultChecked: true,
    },
};

export const Glassy: Story = {
    args: {
        name: "glassy",
        label: "Label",
        variant: "glassy",
    },
    decorators: [
        (Story) => (
            <div
                style={{
                    background: "var(--colors-juice-sugarcane, #b5cc35)",
                    padding: "2rem",
                }}
            >
                <Story />
            </div>
        ),
    ],
    globals: {
        backgrounds: {
            value: "dark",
        },
    },
};
