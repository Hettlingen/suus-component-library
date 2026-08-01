import {useState} from "react";
import type {Meta, StoryObj} from "@storybook/react-vite";
import Accordion from "./accordion";
import TileAccordion from "./components/tile-accordion";

const starIcon = (
    <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <polygon points="12 2 15.2 8.6 22 9.6 17 14.4 18.2 21.2 12 17.8 5.8 21.2 7 14.4 2 9.6 8.8 8.6 12 2"/>
    </svg>
);

const meta = {
    title: "Components/Accordion",
    component: Accordion,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: ["default", "glassy"],
        },
        allowMultipleOpen: {
            control: "boolean",
        },
    },
    args: {
        variant: "default",
        allowMultipleOpen: false,
        children: null,
    },
    decorators: [
        (Story) => (
            <div style={{width: "620px", maxWidth: "95vw"}}>
                <Story/>
            </div>
        ),
    ],
} satisfies Meta<typeof Accordion>;

export default meta;

export const SingleOpenDefault = {
    args: {
        children: null,
    },
    render: (args) => (
        <Accordion {...args} allowMultipleOpen={false} defaultOpenItems={["question-1"]}>
            <TileAccordion itemId="question-1" label="What is the minimum contract duration?">
                The minimum contract duration is 3 months.
            </TileAccordion>
            <TileAccordion
                itemId="question-2"
                label="Can you do mobile and landing page designs?"
                icon={starIcon}
            >
                Yes. We design both web and mobile interfaces and can include landing pages in the project scope.
            </TileAccordion>
            <TileAccordion itemId="question-3" label="Will my designer be limited to their timezone?">
                No. We collaborate asynchronously and align meeting times with your preferred working hours.
            </TileAccordion>
        </Accordion>
    ),
} satisfies StoryObj;

export const MultipleOpenDefault = {
    args: {
        children: null,
    },
    render: (args) => (
        <Accordion {...args} allowMultipleOpen defaultOpenItems={["question-1", "question-2"]}>
            <TileAccordion itemId="question-1" label="What is the minimum contract duration?">
                The minimum contract duration is 3 months.
            </TileAccordion>
            <TileAccordion
                itemId="question-2"
                label="Can you do mobile and landing page designs?"
                icon={starIcon}
            >
                Yes. We design both web and mobile interfaces and can include landing pages in the project scope.
            </TileAccordion>
            <TileAccordion itemId="question-3" label="Do you support part-time subscriptions?">
                Yes. We offer flexible workloads including part-time engagements.
            </TileAccordion>
        </Accordion>
    ),
} satisfies StoryObj;

export const Glassy = {
    args: {
        children: null,
    },
    render: (args) => (
        <Accordion {...args} variant="glassy" defaultOpenItems={["question-2"]}>
            <TileAccordion itemId="question-1" label="How long does it take to start?">
                Usually within a few business days after the kickoff call.
            </TileAccordion>
            <TileAccordion
                itemId="question-2"
                label="Can I interview a designer and see their portfolio?"
                icon={starIcon}
            >
                Absolutely. We can present matching designers with relevant portfolio work before you decide.
            </TileAccordion>
            <TileAccordion itemId="question-3" label="Do you support part-time subscriptions?">
                Yes. We offer flexible workloads including part-time engagements.
            </TileAccordion>
        </Accordion>
    ),
    globals: {
        backgrounds: {
            value: "dark",
        },
    },
} satisfies StoryObj;

export const ControlledOpenItems = {
    args: {
        children: null,
    },
    render: () => {
        const ControlledAccordion = () => {
            const [openItems, setOpenItems] = useState<string[]>(["question-1"]);

            return (
                <div style={{display: "flex", flexDirection: "column", gap: "12px"}}>
                    <Accordion
                        variant="default"
                        allowMultipleOpen
                        openItems={openItems}
                        onOpenItemsChange={setOpenItems}
                    >
                        <TileAccordion itemId="question-1" label="What is the minimum contract duration?">
                            The minimum contract duration is 3 months.
                        </TileAccordion>
                        <TileAccordion itemId="question-2" label="Can you do mobile and landing page designs?" icon={starIcon}>
                            Yes. We design both web and mobile interfaces and can include landing pages in the project scope.
                        </TileAccordion>
                        <TileAccordion itemId="question-3" label="Will my designer be limited to their timezone?">
                            No. We collaborate asynchronously and align meeting times with your preferred working hours.
                        </TileAccordion>
                    </Accordion>

                    <span style={{fontSize: "14px", color: "#5b5a5a"}}>
                        Open Items: {openItems.length ? openItems.join(", ") : "none"}
                    </span>
                </div>
            );
        };

        return <ControlledAccordion/>;
    },
};
