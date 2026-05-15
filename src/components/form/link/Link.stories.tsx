import type { Meta, StoryObj } from "@storybook/react-vite";
import Link from "./Link";

const meta = {
    title: "Components/Link",
    component: Link,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        children: {
            control: "text",
        },
        href: {
            control: "text",
        },
        newTab: {
            control: "boolean",
        },
        showArrow: {
            control: "boolean",
        },
        variant: {
            control: "select",
            options: ["default", "glassy"],
        },
        title: {
            control: "text",
        },
        onClick: {
            action: "clicked",
        },
    },
    args: {
        children: "Zum Shop",
        href: "/shop",
        newTab: false,
        showArrow: true,
        variant: "default",
    },
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: "Zum Shop",
        href: "/shop",
        variant: "default",
        showArrow: true,
    },
};

export const WithoutArrow: Story = {
    args: {
        children: "Mehr erfahren",
        href: "/about",
        variant: "default",
        showArrow: false,
    },
};

export const ExternalLink: Story = {
    args: {
        children: "SUUS besuchen",
        href: "https://suus.ch",
        newTab: true,
        variant: "default",
        showArrow: true,
    },
};

export const ActionLink: Story = {
    args: {
        children: "Mehr anzeigen",
        href: undefined,
        variant: "default",
        showArrow: true,
    },
};

export const LongText: Story = {
    args: {
        children: "Mehr über unsere biologischen Drinks erfahren",
        href: "/shop",
        variant: "default",
        showArrow: true,
    },
};

export const WithTitleAttribute: Story = {
    args: {
        children: "Zum Shop",
        href: "/shop",
        title: "Zur Shop-Seite wechseln",
        variant: "default",
        showArrow: true,
    },
};

export const Glassy: Story = {
    args: {
        children: "Zum Shop",
        href: "/shop",
        variant: "glassy",
        showArrow: true,
    },
    globals: {
        backgrounds: {
            value: "dark",
        },
    },
};

export const GlassyWithoutArrow: Story = {
    args: {
        children: "Mehr erfahren",
        href: "/about",
        variant: "glassy",
        showArrow: false,
    },
    globals: {
        backgrounds: {
            value: "dark",
        },
    },
};

export const GlassyExternalLink: Story = {
    args: {
        children: "SUUS besuchen",
        href: "https://suus.ch",
        newTab: true,
        variant: "glassy",
        showArrow: true,
    },
    globals: {
        backgrounds: {
            value: "dark",
        },
    },
};

export const GlassyActionLink: Story = {
    args: {
        children: "Mehr anzeigen",
        href: undefined,
        variant: "glassy",
        showArrow: true,
    },
    globals: {
        backgrounds: {
            value: "dark",
        },
    },
};

export const MultipleLinks: Story = {
    render: () => (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                alignItems: "flex-start",
            }}
        >
            <Link href="/shop">Zum Shop</Link>
            <Link href="/about">Über uns</Link>
            <Link href="/contact" showArrow={false}>
                Kontakt
            </Link>
            <Link href="https://suus.ch" newTab>
                SUUS besuchen
            </Link>
        </div>
    ),
};

export const MultipleGlassyLinks: Story = {
    render: () => (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                alignItems: "flex-start",
            }}
        >
            <Link href="/shop" variant="glassy">
                Zum Shop
            </Link>
            <Link href="/about" variant="glassy">
                Über uns
            </Link>
            <Link href="/contact" variant="glassy" showArrow={false}>
                Kontakt
            </Link>
            <Link href="https://suus.ch" variant="glassy" newTab>
                SUUS besuchen
            </Link>
        </div>
    ),
    globals: {
        backgrounds: {
            value: "dark",
        },
    },
};
