import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { DeleteIcon, PenIcon, ShareIcon } from "../icons";
import PopupMenu from "./popup-menu";

const meta = {
    title: "Components/PopupMenu",
    component: PopupMenu,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        items: {
            control: false,
            description: "Einträge, die das Menü nach dem Klick auf die drei Punkte anzeigt.",
        },
    },
} satisfies Meta<typeof PopupMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        items: [
            { label: "Bearbeiten", icon: <PenIcon width={24} height={24} />, onClick: fn() },
            { label: "Teilen", icon: <ShareIcon width={24} height={24} />, onClick: fn() },
            { label: "Löschen", icon: <DeleteIcon width={24} height={24} />, onClick: fn() },
        ],
    },
};

export const WithDisabledItem: Story = {
    args: {
        items: [
            { label: "Bearbeiten", icon: <PenIcon width={24} height={24} />, onClick: fn() },
            { label: "Teilen", icon: <ShareIcon width={24} height={24} />, disabled: true, onClick: fn() },
            { label: "Löschen", icon: <DeleteIcon width={24} height={24} />, onClick: fn() },
        ],
    },
};
