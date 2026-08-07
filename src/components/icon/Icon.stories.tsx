import type {Meta, StoryObj} from "@storybook/react-vite";
import Icon from "./icon";

const bellIcon = (
    <svg
        viewBox="0 0 24 24"
        width="100%"
        height="100%"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="M15 17h5l-1.4-1.4a2 2 0 0 1-.6-1.4V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5"/>
        <path d="M9 17a3 3 0 0 0 6 0"/>
    </svg>
);

const meta = {
    title: "Components/Icon",
    component: Icon,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        icon: {
            control: false,
        },
        badgeCount: {
            control: "number",
        },
        size: {
            control: "number",
        },
        badgeColor: {
            control: "color",
        },
    },
    args: {
        icon: bellIcon,
        size: 32,
    },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithBadge: Story = {
    args: {
        badgeCount: 3,
    },
};

export const WithBadgeAndHighBadgeCount: Story = {
    args: {
        badgeCount: 200,
    },
};

export const CustomBadgeColor: Story = {
    args: {
        badgeCount: 7,
        badgeColor: "#ff5f5f",
    },
};

export const Large: Story = {
    args: {
        size: 56,
        badgeCount: 2,
    },
};
