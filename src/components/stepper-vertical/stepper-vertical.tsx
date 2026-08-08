import styles from "./stepper-vertical.module.css";
import React, { Children, cloneElement, isValidElement, useEffect, useMemo, useRef, useState } from "react";

export type StepperVerticalProps = {
    stepTitles: string[];
    children: React.ReactNode;
    onFinish?: () => void | Promise<void>;
    initialStep?: number;
};

export type StepperVerticalStepProps = {
    onNext: () => void | Promise<void>;
    onBack: () => void;
    isFirstStep: boolean;
    isLastStep: boolean;
};

export function StepperVertical({
                                            stepTitles,
                                            children,
                                            onFinish,
                                            initialStep = 0,
                                        }: StepperVerticalProps) {
    const steps = useMemo(
        () => Children.toArray(children).filter(isValidElement),
        [children]
    );

    const [currentStep, setCurrentStep] = useState(() =>
        initialStep >= 0 && initialStep < steps.length ? initialStep : 0
    );
    const [direction, setDirection] = useState<"forward" | "backward">("forward");
    const topRef = useRef<HTMLDivElement | null>(null);

    // Beim Wechsel des Steps immer nach oben scrollen (auch innerhalb von Scroll-Containern)
    useEffect(() => {
        topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, [currentStep]);

    useEffect(() => {
        if (initialStep < 0 || initialStep >= steps.length) {
            return;
        }

        // Intentional sync reset when the controlling prop changes.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCurrentStep(initialStep);
    }, [initialStep, steps.length]);

    const displayTitles =
        stepTitles && stepTitles.length === steps.length
            ? stepTitles
            : steps.map((_, i) => `Schritt ${i + 1}`);

    const isLast = currentStep === steps.length - 1;

    const nextStep = async () => {
        if (!isLast) {
            setDirection("forward");
            setCurrentStep((s) => s + 1);
            return;
        }
        if (onFinish) await onFinish();
    };

    const prevStep = () => {
        setDirection("backward");
        setCurrentStep((s) => s - 1);
    };

    return (
        <div className={styles.stepperVStack}>
            <div ref={topRef} />
            {displayTitles.map((title, index) => {
                const status =
                    index < currentStep
                        ? "done"
                        : index === currentStep
                            ? "active"
                            : "upcoming";

                const isActive = index === currentStep;
                const isStepLast = index === steps.length - 1;

                return (
                    <div key={`step-${index}`} className={`${styles.stepRow} ${styles[status]}`}>
                        <div className={styles.rail}>
                            <div className={styles.dot}>
                                <span className={styles.dotNumber}>{index + 1}</span>
                            </div>
                            {!isStepLast && <div className={styles.connector} />}
                        </div>

                        <div className={styles.stepBody}>
                            <div className={styles.stepTitle}>{title}</div>

                            {isActive && (
                                <div
                                    key={currentStep} // wichtig für Re-Animation
                                    className={`${styles.stepContent} ${styles[`animate-${direction}`]}`}
                                >
                                    {cloneElement(steps[index], {
                                        onNext: nextStep,
                                        onBack: prevStep,
                                        isFirstStep: currentStep === 0,
                                        isLastStep: isLast,
                                    } as StepperVerticalStepProps)}
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
