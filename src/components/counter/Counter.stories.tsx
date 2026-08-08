import {useEffect, useState} from "react";
import type {Meta, StoryObj} from "@storybook/react-vite";
import {Counter} from "./counter";

type CounterStoryProps = {
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
};

function CounterStory({
    value = 2,
    min = 0,
    max = 10,
    step = 1,
    disabled = false,
}: CounterStoryProps) {
    const [currentValue, setCurrentValue] = useState(value);

    useEffect(() => {
        setCurrentValue(value);
    }, [value]);

    return (
        <div style={{display: "flex", flexDirection: "column", gap: "12px"}}>
            <Counter
                value={currentValue}
                min={min}
                max={max}
                step={step}
                disabled={disabled}
                onChange={setCurrentValue}
            />
            <span style={{fontSize: "14px", color: "#5b5a5a"}}>
                Aktueller Wert: {currentValue}
            </span>
        </div>
    );
}

const meta = {
    title: "Components/Counter",
    component: CounterStory,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        value: {
            control: "number",
        },
        min: {
            control: "number",
        },
        max: {
            control: "number",
        },
        step: {
            control: "number",
        },
        disabled: {
            control: "boolean",
        },
    },
    args: {
        value: 2,
        min: 0,
        max: 10,
        step: 1,
        disabled: false,
    },
} satisfies Meta<typeof CounterStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MinMax: Story = {
    args: {
        value: 4,
        min: 2,
        max: 6,
    },
};

export const StepSize: Story = {
    args: {
        value: 10,
        step: 5,
        max: 30,
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
};
