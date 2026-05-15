import type { Meta, StoryObj } from "@storybook/react-vite";
import Chip from "./Chip";

const meta = {
    title: "Components/Chip",
    component: Chip,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        children: {
            control: "text",
        },
        variant: {
            control: "select",
            options: ["default", "glassy"],
        },
        title: {
            control: "text",
        },
    },
    args: {
        children: "Bio",
        variant: "default",
    },
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: "Bio",
        variant: "default",
    },
};

export const DefaultLongText: Story = {
    args: {
        children: "Limited Edition",
        variant: "default",
    },
};

export const Glassy: Story = {
    args: {
        children: "Sugarcane",
        variant: "glassy",
    },
    globals: {
        backgrounds: {
            value: "dark",
        },
    },
};

export const GlassyLongText: Story = {
    args: {
        children: "Tamarind Ginger Lime",
        variant: "glassy",
    },
    globals: {
        backgrounds: {
            value: "dark",
        },
    },
};

export const WithTitleAttribute: Story = {
    args: {
        children: "Guava",
        variant: "default",
        title: "Geschmacksrichtung Guava",
    },
};

export const CustomColors: Story = {
    args: {
        children: "Ice Tea",
        variant: "default",
        style: {
            "--chip-border-color": "#e14a4a",
            "--chip-background-color": "rgba(225, 74, 74, 0.12)",
            "--chip-text-color": "#e14a4a",
        } as React.CSSProperties,
    },
};

export const MultipleChips: Story = {
    render: () => (
        <div
            style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                alignItems: "center",
                maxWidth: "420px",
            }}
        >
            <Chip>Bio</Chip>
            <Chip>Vegan</Chip>
            <Chip>Ohne Zusätze</Chip>
            <Chip>Limited Edition</Chip>
        </div>
    ),
};

export const MultipleGlassyChips: Story = {
    render: () => (
        <div
            style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                alignItems: "center",
                maxWidth: "420px",
            }}
        >
            <Chip variant="glassy">Sugarcane</Chip>
            <Chip variant="glassy">Tamarind</Chip>
            <Chip variant="glassy">Guava</Chip>
            <Chip variant="glassy">Ice Tea</Chip>
        </div>
    ),
    globals: {
        backgrounds: {
            value: "dark",
        },
    },
};
