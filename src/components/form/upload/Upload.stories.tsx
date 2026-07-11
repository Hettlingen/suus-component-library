import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Upload from "./Upload";

const createMockImageFile = () => {
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160">
            <rect width="160" height="160" rx="32" fill="#a7b325"/>
            <circle cx="80" cy="64" r="28" fill="#ffffff" opacity="0.85"/>
            <rect x="36" y="106" width="88" height="18" rx="9" fill="#ffffff" opacity="0.85"/>
        </svg>
    `;

    return new File([svg], "avatar-preview.svg", {
        type: "image/svg+xml",
    });
};

const createMockPdfFile = () => {
    return new File(["Mock PDF content"], "produktdatenblatt.pdf", {
        type: "application/pdf",
    });
};

const meta = {
    title: "Form/Upload",
    component: Upload,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        label: {
            control: "text",
        },
        name: {
            control: "text",
        },
        variant: {
            control: "select",
            options: ["default", "glassy"],
        },
        accept: {
            control: "text",
        },
        maxSizeBytes: {
            control: "number",
        },
        disabled: {
            control: "boolean",
        },
        required: {
            control: "boolean",
        },
        error: {
            control: "text",
        },
        file: {
            table: {
                disable: true,
            },
        },
        onFileChange: {
            action: "file changed",
        },
        onChange: {
            action: "changed",
        },
    },
    args: {
        label: "Avatar hochladen",
        name: "avatar",
        variant: "default",
        accept: "image/*",
        maxSizeBytes: 5 * 1024 * 1024,
        disabled: false,
        required: false,
    },
    decorators: [
        (Story) => (
            <div style={{ width: "420px" }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Upload>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: "Avatar hochladen",
        name: "avatarDefault",
        variant: "default",
        accept: "image/*",
        maxSizeBytes: 5 * 1024 * 1024,
    },
};

export const ImageOnly: Story = {
    args: {
        label: "Profilbild hochladen",
        name: "profileImage",
        variant: "default",
        accept: "image/*",
        maxSizeBytes: 2 * 1024 * 1024,
    },
};

export const PdfOnly: Story = {
    args: {
        label: "PDF hochladen",
        name: "pdfUpload",
        variant: "default",
        accept: "application/pdf",
        maxSizeBytes: 10 * 1024 * 1024,
    },
};

export const Error: Story = {
    args: {
        label: "Avatar hochladen",
        name: "avatarError",
        variant: "default",
        accept: "image/*",
        maxSizeBytes: 5 * 1024 * 1024,
        error: "Bitte lade ein gültiges Bild hoch.",
    },
};

export const Disabled: Story = {
    args: {
        label: "Avatar hochladen",
        name: "avatarDisabled",
        variant: "default",
        accept: "image/*",
        disabled: true,
    },
};

export const WithSelectedImage: Story = {
    args: {
        label: "Avatar hochladen",
        name: "avatarSelected",
        variant: "default",
        accept: "image/*",
        file: createMockImageFile(),
    },
};

export const WithSelectedPdf: Story = {
    args: {
        label: "Produktdatenblatt hochladen",
        name: "productPdfSelected",
        variant: "default",
        accept: "application/pdf",
        file: createMockPdfFile(),
    },
};

export const Glassy: Story = {
    args: {
        label: "Avatar hochladen",
        name: "avatarGlassy",
        variant: "glassy",
        accept: "image/*",
        maxSizeBytes: 5 * 1024 * 1024,
    },
    globals: {
        backgrounds: {
            value: "dark",
        },
    },
};

export const GlassyError: Story = {
    args: {
        label: "Avatar hochladen",
        name: "avatarGlassyError",
        variant: "glassy",
        accept: "image/*",
        error: "Bitte lade ein gültiges Bild hoch.",
    },
    globals: {
        backgrounds: {
            value: "dark",
        },
    },
};

export const GlassyDisabled: Story = {
    args: {
        label: "Avatar hochladen",
        name: "avatarGlassyDisabled",
        variant: "glassy",
        accept: "image/*",
        disabled: true,
    },
    globals: {
        backgrounds: {
            value: "dark",
        },
    },
};

export const GlassyWithSelectedImage: Story = {
    args: {
        label: "Avatar hochladen",
        name: "avatarGlassySelected",
        variant: "glassy",
        accept: "image/*",
        file: createMockImageFile(),
    },
    globals: {
        backgrounds: {
            value: "dark",
        },
    },
};

export const Controlled: Story = {
    render: () => {
        const [file, setFile] = useState<File | null>(null);

        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                }}
            >
                <Upload
                    label="Avatar hochladen"
                    name="controlledAvatar"
                    file={file}
                    onFileChange={setFile}
                    accept="image/*"
                    maxSizeBytes={5 * 1024 * 1024}
                />

                <span
                    style={{
                        fontSize: "14px",
                        color: "#5b5a5a",
                    }}
                >
                    Aktuelle Datei: {file ? file.name : "Keine Datei ausgewählt"}
                </span>
            </div>
        );
    },
};

export const ControlledGlassy: Story = {
    render: () => {
        const [file, setFile] = useState<File | null>(createMockImageFile());

        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                }}
            >
                <Upload
                    label="Avatar hochladen"
                    name="controlledAvatarGlassy"
                    file={file}
                    onFileChange={setFile}
                    accept="image/*"
                    maxSizeBytes={5 * 1024 * 1024}
                    variant="glassy"
                />

                <span
                    style={{
                        fontSize: "14px",
                        color: "#ffffff",
                    }}
                >
                    Aktuelle Datei: {file ? file.name : "Keine Datei ausgewählt"}
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
