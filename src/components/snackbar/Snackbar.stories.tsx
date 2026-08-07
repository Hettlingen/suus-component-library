import {useState} from "react";
import type {Meta, StoryObj} from "@storybook/react-vite";
import Snackbar from "./snackbar";

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
