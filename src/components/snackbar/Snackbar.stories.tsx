import {useState} from "react";
import type {Meta, StoryObj} from "@storybook/react-vite";
import Snackbar from "./snackbar";
import styles from "./snackbar.module.css";

const meta = {
    title: "Components/Snackbar",
    component: Snackbar,
    parameters: {
        layout: "fullscreen",
    },
    tags: ["autodocs"],
    argTypes: {
        message: {
            control: "text",
        },
        isOpen: {
            control: "boolean",
        },
        duration: {
            control: "number",
        },
        dismissOn: {
            control: "select",
            options: ["duration", "close", "action"],
            description: "Bestimmt, wodurch die Snackbar geschlossen wird.",
        },
        title: {
            control: "text",
        },
        actionLabel: {
            control: "text",
        },
        type: {
            control: "select",
            options: ["success", "info", "warning", "error"],
        },
        onClose: {
            action: "closed",
        },
    },
    args: {
        message: "Deine Änderungen wurden gespeichert.",
        isOpen: true,
        duration: 5000,
        type: "info",
        dismissOn: "duration",
        actionLabel: "CLICK ME",
    },
} satisfies Meta<typeof Snackbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Info: Story = {};

export const Success: Story = {
    args: {
        message: "Erfolgreich gespeichert.",
        type: "success",
    },
};

export const Warning: Story = {
    args: {
        message: "Bitte prüfe deine Eingaben.",
        type: "warning",
    },
};

export const Error: Story = {
    args: {
        message: "Es ist ein Fehler aufgetreten.",
        type: "error",
    },
};

export const UntilClosed: Story = {
    args: {
        dismissOn: "close",
        message: "Diese Snackbar bleibt sichtbar, bis du X auswählst.",
    },
};

export const UntilAction: Story = {
    args: {
        dismissOn: "action",
        actionLabel: "CLICK ME",
        message: "Diese Snackbar bleibt sichtbar, bis du den Link auswählst.",
    },
};

export const AllVariants: Story = {
    render: (args) => {
        const types = ["info", "success", "warning", "error"] as const;
        const Demo = () => {
            const [openItems, setOpenItems] = useState(types.map(() => true));

            return (
                <div id="snackbar-gallery" style={{display: "grid", gap: 16, padding: 16}}>
                    <style>{`#snackbar-gallery [class~="${styles.snackbar}"] { position: static; inset: auto; transform: none; width: 100%; }`}</style>
                    {types.map((type, index) => (
                        <Snackbar
                            key={type}
                            {...args}
                            type={type}
                            title={type === "info" ? "Information" : type[0].toUpperCase() + type.slice(1)}
                            message="Lorem Ipsum Lorem Ipsum"
                            dismissOn="action"
                            actionLabel={args.actionLabel || "CLICK ME"}
                            isOpen={openItems[index]}
                            onClose={() => setOpenItems((items) => items.map((open, itemIndex) => itemIndex === index ? false : open))}
                        />
                    ))}
                </div>
            );
        };

        return <Demo/>;
    },
    args: {
        dismissOn: "action",
    },
};

export const WithTrigger: Story = {
    render: (args) => {
        const Demo = () => {
            const [isOpen, setIsOpen] = useState(false);

            return (
                <div style={{padding: "16px"}}>
                    <button type="button" onClick={() => setIsOpen(true)}>
                        Snackbar anzeigen
                    </button>
                    <Snackbar {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}/>
                </div>
            );
        };

        return <Demo/>;
    },
};
