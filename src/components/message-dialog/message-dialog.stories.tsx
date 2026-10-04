import type {Meta, StoryObj} from "@storybook/react-vite";
import {MessageDialog} from "./message-dialog";

const meta = {
    title: "Components/MessageDialog",
    component: MessageDialog,
    tags: ["autodocs"],
    argTypes: {
        type: {control: "select", options: ["SUCCESS", "INFO", "WARNING", "ERROR"]},
        variant: {control: "select", options: ["default", "glassy"]},
        onClose: {action: "closed"},
        onPrimaryButtonClick: {action: "primary"},
        onSecondaryLinkClick: {action: "secondary"},
    },
    args: {
        type: "SUCCESS",
        variant: "default",
        title: "Newsletter aktiviert",
        description: "Dein Newsletter wurde erfolgreich aktiviert. Vielen Dank für dein Interesse.",
        primaryButtonLabel: "Entdecke unsere Getränke",
        secondaryLinkLabel: "Home",
    },
} satisfies Meta<typeof MessageDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {};
export const Info: Story = {args: {type: "INFO", title: "Hinweis"}};
export const Warning: Story = {args: {type: "WARNING", title: "Achtung"}};
export const Error: Story = {args: {type: "ERROR", title: "Etwas ist schiefgelaufen"}};
export const Glassy: Story = {
    args: {variant: "glassy"},
    decorators: [(Story) => (
        <div style={{padding: 32, background: "linear-gradient(135deg,#d0e646,#5c6814)"}}><Story/></div>
    )],
};
export const WithoutActions: Story = {
    args: {primaryButtonLabel: undefined, secondaryLinkLabel: undefined},
};
