import type { Meta, StoryObj } from "@storybook/react-vite";
import { Panel } from "./panel";

const meta = {
    title: "Components/Panel",
    component: Panel,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Panel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: (
            <div style={{ minWidth: "min(820px, 85vw)" }}>
                <h2 style={{ margin: "0 0 1rem", color: "var(--color-text-default)" }}>Was SUUS ausmacht</h2>
                <ul style={{ margin: 0, paddingLeft: "1.4rem", color: "var(--color-text-default)", lineHeight: 1.6 }}>
                    <li>biologische Rohstoffe aus nachhaltigem Anbau</li>
                    <li>natürliche Aromen ohne künstliche Zusätze</li>
                    <li>sorgfältig abgestimmte Rezepturen mit Charakter</li>
                    <li>echte Zutaten mit Herkunft und Geschichte</li>
                    <li>langfristige Beziehungen zu unseren Produzenten</li>
                </ul>
            </div>
        ),
    },
};
