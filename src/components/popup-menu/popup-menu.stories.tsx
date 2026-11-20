import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
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
            { label: "Bearbeiten", icon: <EditOutlinedIcon />, onClick: fn() },
            { label: "Teilen", icon: <ShareOutlinedIcon />, onClick: fn() },
            { label: "Löschen", icon: <DeleteOutlineIcon />, onClick: fn() },
        ],
    },
};

export const WithDisabledItem: Story = {
    args: {
        items: [
            { label: "Bearbeiten", icon: <EditOutlinedIcon />, onClick: fn() },
            { label: "Teilen", icon: <ShareOutlinedIcon />, disabled: true, onClick: fn() },
            { label: "Löschen", icon: <DeleteOutlineIcon />, onClick: fn() },
        ],
    },
};
