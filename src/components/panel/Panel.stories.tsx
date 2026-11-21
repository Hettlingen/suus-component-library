import type { Meta, StoryObj } from "@storybook/react-vite";
import { Panel } from "./panel";

const meta = {
    title: "Components/Panel",
    component: Panel,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: ["default", "glassy"],
        },
    },
    args: {
        title: "Was SUUS ausmacht",
        children: (
            <ul style={{ width: "min(42rem, 70vw)", margin: 0, paddingLeft: "1.4rem", lineHeight: 1.6 }}>
                <li>biologische Rohstoffe aus nachhaltigem Anbau</li>
                <li>natürliche Aromen ohne künstliche Zusätze</li>
                <li>sorgfältig abgestimmte Rezepturen mit Charakter</li>
                <li>echte Zutaten mit Herkunft und Geschichte</li>
                <li>langfristige Beziehungen zu unseren Produzenten</li>
            </ul>
        ),
    },
} satisfies Meta<typeof Panel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Glassy: Story = {
    args: { variant: "glassy" },
    decorators: [
        (Story) => (
            <div style={{ padding: "2rem", background: "var(--color-green-midnight)" }}>
                <Story />
            </div>
        ),
    ],
};
