import type { Meta, StoryObj } from "@storybook/react-vite";
import * as icons from "./index";

const meta = {
    title: "Components/Icon Catalog",
} satisfies Meta;

export default meta;

export const Catalog: StoryObj<typeof meta> = {
    render: () => (
        <ul style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(164px, 1fr))",
            gap: "1rem",
            listStyle: "none",
            padding: 0,
        }}>
            {Object.entries(icons).map(([name, Icon]) => (
                <li key={name} style={{ display: "grid", justifyItems: "center", gap: "0.5rem" }}>
                    <Icon width={32} height={32} />
                    <code>{name}</code>
                </li>
            ))}
        </ul>
    ),
};
