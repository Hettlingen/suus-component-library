import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import IconButton from "./IconButton.tsx";
import { PenIcon } from "../../icons/PenIcon";

const meta = {
    title: "Components/IconButton",
    component: IconButton,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        label: {
            control: "text",
        },
        variant: {
            control: "select",
            options: ["default", "glassy"],
        },
        frame: {
            control: "boolean",
        },
        active: {
            control: "boolean",
        },
        size: {
            control: "select",
            options: ["small", "default", "large"],
        },
        disabled: {
            control: "boolean",
        },
        type: {
            control: "select",
            options: ["button", "submit", "reset"],
        },
        icon: {
            control: false,
        },
        onClick: {
            action: "clicked",
        },
    },
    args: {
        label: "Bearbeiten",
        icon: <PenIcon />,
        variant: "default",
        frame: true,
        active: false,
        size: "default",
        disabled: false,
        type: "button",
    },
    decorators: [
        (Story) => (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: "Bearbeiten",
        icon: <PenIcon />,
        variant: "default",
        frame: true,
    },
};

export const WithoutFrame: Story = {
    args: {
        label: "Bearbeiten",
        icon: <PenIcon />,
        variant: "default",
        frame: false,
    },
};

export const Active: Story = {
    args: {
        label: "Bearbeiten aktiv",
        icon: <PenIcon />,
        active: true,
        frame: true,
        variant: "default",
    },
};

export const ActiveWithoutFrame: Story = {
    args: {
        label: "Bearbeiten aktiv",
        icon: <PenIcon />,
        active: true,
        frame: false,
        variant: "default",
    },
};

export const Disabled: Story = {
    args: {
        label: "Bearbeiten deaktiviert",
        icon: <PenIcon />,
        disabled: true,
        frame: true,
        variant: "default",
    },
};

export const DisabledWithoutFrame: Story = {
    args: {
        label: "Bearbeiten deaktiviert",
        icon: <PenIcon />,
        disabled: true,
        frame: false,
        variant: "default",
    },
};

export const Small: Story = {
    args: {
        label: "Bearbeiten klein",
        icon: <PenIcon />,
        size: "small",
        frame: true,
        variant: "default",
    },
};

export const Large: Story = {
    args: {
        label: "Bearbeiten gross",
        icon: <PenIcon />,
        size: "large",
        frame: true,
        variant: "default",
    },
};

export const Glassy: Story = {
    args: {
        label: "Bearbeiten",
        icon: <PenIcon />,
        variant: "glassy",
        frame: true,
    },
    globals: {
        backgrounds: {
            value: "dark",
        },
    },
};

export const GlassyWithoutFrame: Story = {
    args: {
        label: "Bearbeiten",
        icon: <PenIcon />,
        variant: "glassy",
        frame: false,
    },
    globals: {
        backgrounds: {
            value: "dark",
        },
    },
};

export const GlassyActive: Story = {
    args: {
        label: "Bearbeiten aktiv",
        icon: <PenIcon />,
        variant: "glassy",
        frame: true,
        active: true,
    },
    globals: {
        backgrounds: {
            value: "dark",
        },
    },
};

export const GlassyDisabled: Story = {
    args: {
        label: "Bearbeiten deaktiviert",
        icon: <PenIcon />,
        variant: "glassy",
        frame: true,
        disabled: true,
    },
    globals: {
        backgrounds: {
            value: "dark",
        },
    },
};

export const AllVariants: Story = {
    render: () => (
        <div
            style={{
                display: "flex",
                gap: "16px",
                alignItems: "center",
                flexWrap: "wrap",
            }}
        >
            <IconButton label="Default" icon={<PenIcon />} />

            <IconButton
                label="Ohne Rahmen"
                icon={<PenIcon />}
                frame={false}
            />

            <IconButton
                label="Aktiv"
                icon={<PenIcon />}
                active
            />

            <IconButton
                label="Klein"
                icon={<PenIcon />}
                size="small"
            />

            <IconButton
                label="Gross"
                icon={<PenIcon />}
                size="large"
            />

            <IconButton
                label="Deaktiviert"
                icon={<PenIcon />}
                disabled
            />
        </div>
    ),
};

export const GlassyVariants: Story = {
    render: () => (
        <div
            style={{
                display: "flex",
                gap: "16px",
                alignItems: "center",
                flexWrap: "wrap",
            }}
        >
            <IconButton
                label="Glassy"
                icon={<PenIcon />}
                variant="glassy"
            />

            <IconButton
                label="Glassy ohne Rahmen"
                icon={<PenIcon />}
                variant="glassy"
                frame={false}
            />

            <IconButton
                label="Glassy aktiv"
                icon={<PenIcon />}
                variant="glassy"
                active
            />

            <IconButton
                label="Glassy klein"
                icon={<PenIcon />}
                variant="glassy"
                size="small"
            />

            <IconButton
                label="Glassy gross"
                icon={<PenIcon />}
                variant="glassy"
                size="large"
            />

            <IconButton
                label="Glassy deaktiviert"
                icon={<PenIcon />}
                variant="glassy"
                disabled
            />
        </div>
    ),
    globals: {
        backgrounds: {
            value: "dark",
        },
    },
};

export const Controlled: Story = {
    render: () => {
        const [active, setActive] = useState(false);

        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    alignItems: "center",
                }}
            >
                <IconButton
                    label={active ? "Bearbeitung deaktivieren" : "Bearbeitung aktivieren"}
                    icon={<PenIcon />}
                    active={active}
                    onClick={() => setActive((prev) => !prev)}
                />

                <span
                    style={{
                        fontSize: "14px",
                        color: "#5b5a5a",
                    }}
                >
          Aktueller Wert: {active ? "aktiv" : "inaktiv"}
        </span>
            </div>
        );
    },
};

export const ControlledWithoutFrame: Story = {
    render: () => {
        const [active, setActive] = useState(false);

        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    alignItems: "center",
                }}
            >
                <IconButton
                    label={active ? "Bearbeitung deaktivieren" : "Bearbeitung aktivieren"}
                    icon={<PenIcon />}
                    frame={false}
                    active={active}
                    onClick={() => setActive((prev) => !prev)}
                />

                <span
                    style={{
                        fontSize: "14px",
                        color: "#5b5a5a",
                    }}
                >
          Aktueller Wert: {active ? "aktiv" : "inaktiv"}
        </span>
            </div>
        );
    },
};

export const ControlledGlassy: Story = {
    render: () => {
        const [active, setActive] = useState(true);

        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    alignItems: "center",
                }}
            >
                <IconButton
                    label={active ? "Bearbeitung deaktivieren" : "Bearbeitung aktivieren"}
                    icon={<PenIcon />}
                    variant="glassy"
                    active={active}
                    onClick={() => setActive((prev) => !prev)}
                />

                <span
                    style={{
                        fontSize: "14px",
                        color: "#ffffff",
                    }}
                >
          Aktueller Wert: {active ? "aktiv" : "inaktiv"}
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

export const ControlledGlassyWithoutFrame: Story = {
    render: () => {
        const [active, setActive] = useState(true);

        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    alignItems: "center",
                }}
            >
                <IconButton
                    label={active ? "Bearbeitung deaktivieren" : "Bearbeitung aktivieren"}
                    icon={<PenIcon />}
                    variant="glassy"
                    frame={false}
                    active={active}
                    onClick={() => setActive((prev) => !prev)}
                />

                <span
                    style={{
                        fontSize: "14px",
                        color: "#ffffff",
                    }}
                >
          Aktueller Wert: {active ? "aktiv" : "inaktiv"}
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
