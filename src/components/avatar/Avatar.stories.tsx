import type {Meta, StoryObj} from "@storybook/react-vite";
import Avatar from "./avatar";

const avatarImage = `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
        <defs>
            <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#7cc4a7" />
                <stop offset="100%" stop-color="#4f8fba" />
            </linearGradient>
        </defs>
        <rect width="120" height="120" rx="60" fill="url(#bg)" />
        <circle cx="60" cy="48" r="18" fill="white" opacity="0.95" />
        <path d="M28 102c5-20 21-30 32-30s27 10 32 30" fill="white" opacity="0.95" />
    </svg>`
)}`;

const meta = {
    title: "Components/Avatar",
    component: Avatar,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        src: {
            control: "text",
        },
        alt: {
            control: "text",
        },
        size: {
            control: "number",
        },
        shape: {
            control: "select",
            options: ["circle", "square"],
        },
        fallbackSrc: {
            control: "text",
        },
        children: {
            control: false,
        },
        onClick: {
            action: "clicked",
        },
    },
    args: {
        src: avatarImage,
        alt: "Avatar",
        size: 40,
        shape: "circle",
    },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Circle: Story = {};

export const Square: Story = {
    args: {
        shape: "square",
    },
};

export const Large: Story = {
    args: {
        size: 72,
    },
};

export const WithFallback: Story = {
    args: {
        src: "https://example.invalid/avatar-does-not-exist.png",
        fallbackSrc: avatarImage,
    },
};

export const WithIconChild: Story = {
    args: {
        src: undefined,
        children: (
            <svg
                viewBox="0 0 24 24"
                width="70%"
                height="70%"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <circle cx="12" cy="8" r="3" />
                <path d="M5 21c1.5-4 5-6 7-6s5.5 2 7 6" />
            </svg>
        ),
    },
};
