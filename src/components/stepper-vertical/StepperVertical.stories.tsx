import type {Meta, StoryObj} from "@storybook/react-vite";
import type {ComponentProps} from "react";
import StepperVertical, {type StepperVerticalStepProps} from "./stepper-vertical";

function StepOne({onNext = () => {}, isLastStep = false}: Partial<StepperVerticalStepProps>) {
    return (
        <div style={{display: "flex", flexDirection: "column", gap: "12px"}}>
            <p style={{margin: 0}}>Erfasse die grundlegenden Angaben.</p>
            <button type="button" onClick={onNext}>
                {isLastStep ? "Abschliessen" : "Weiter"}
            </button>
        </div>
    );
}

function StepTwo({onNext = () => {}, onBack = () => {}}: Partial<StepperVerticalStepProps>) {
    return (
        <div style={{display: "flex", flexDirection: "column", gap: "12px"}}>
            <p style={{margin: 0}}>Prüfe die Konfiguration und gehe weiter.</p>
            <div style={{display: "flex", gap: "8px"}}>
                <button type="button" onClick={onBack}>
                    Zurück
                </button>
                <button type="button" onClick={onNext}>
                    Weiter
                </button>
            </div>
        </div>
    );
}

function StepThree({
    onBack = () => {},
    isFirstStep = false,
    isLastStep = false,
}: Partial<StepperVerticalStepProps>) {
    return (
        <div style={{display: "flex", flexDirection: "column", gap: "12px"}}>
            <p style={{margin: 0}}>Überprüfe alles und schliesse den Prozess ab.</p>
            <div style={{display: "flex", gap: "8px"}}>
                <button type="button" onClick={onBack}>
                    Zurück
                </button>
                <button type="button" disabled={isFirstStep || !isLastStep}>
                    Fertig
                </button>
            </div>
        </div>
    );
}

type StepperVerticalStoryProps = {
    stepTitles?: string[];
    initialStep?: number;
    onFinish?: ComponentProps<typeof StepperVertical>["onFinish"];
};

function StepperVerticalStory({
    stepTitles = ["Grunddaten", "Prüfung", "Abschluss"],
    initialStep = 0,
    onFinish,
}: StepperVerticalStoryProps) {
    return (
        <StepperVertical stepTitles={stepTitles} initialStep={initialStep} onFinish={onFinish}>
            <StepOne />
            <StepTwo />
            <StepThree />
        </StepperVertical>
    );
}

const meta = {
    title: "Components/StepperVertical",
    component: StepperVerticalStory,
    parameters: {
        layout: "padded",
    },
    tags: ["autodocs"],
    argTypes: {
        stepTitles: {
            control: false,
        },
        initialStep: {
            control: "number",
        },
        onFinish: {
            action: "finished",
        },
    },
    args: {
        stepTitles: ["Grunddaten", "Prüfung", "Abschluss"],
        initialStep: 0,
    },
} satisfies Meta<typeof StepperVerticalStory>;

export default meta;

type Story = StoryObj<typeof meta>;

const renderStepper = (args: Story["args"]) => (
    <StepperVerticalStory {...args} key={args?.initialStep ?? 0} />
);

export const Default: Story = {
    args: {},
    render: renderStepper,
};

export const StartAtSecondStep: Story = {
    args: {
        initialStep: 1,
    },
    render: renderStepper,
};
