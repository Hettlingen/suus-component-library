import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Modal } from "./modal";
import type { ModalProps } from "./modal";

function ModalExample(args: ModalProps) {
    const [open, setOpen] = useState(args.open);

    return (
        <>
            <button type="button" onClick={() => setOpen(true)}>
                Modal öffnen
            </button>
            <Modal {...args} open={open} onClose={() => setOpen(false)} />
        </>
    );
}

const meta = {
    title: "Components/Modal",
    component: Modal,
    tags: ["autodocs"],
    argTypes: {
        open: { control: "boolean" },
        appearance: { control: "select", options: ["default", "glass"] },
        onClose: { action: "closed" },
    },
    args: {
        open: true,
        title: "Modal",
        appearance: "default",
        children: "Dies ist der Inhalt des Modals.",
    },
    render: (args) => <ModalExample {...args} />,
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Glass: Story = {
    args: { appearance: "glass", title: "Glass Modal" },
    globals: {
        backgrounds: {
            value: "dark",
        },
    },
};
