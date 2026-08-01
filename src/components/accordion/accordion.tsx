import {useCallback, useMemo, useState, type ReactNode} from "react";
import {AccordionContext, type AccordionVariant} from "./accordion-context";
import styles from "./accordion.module.css";

export type {AccordionVariant} from "./accordion-context";

export type AccordionProps = {
    children?: ReactNode;
    variant?: AccordionVariant;
    allowMultipleOpen?: boolean;
    defaultOpenItems?: string[];
    openItems?: string[];
    onOpenItemsChange?: (openItems: string[]) => void;
    className?: string;
};

function normalizeOpenItems(items?: string[], allowMultipleOpen = false) {
    const normalized = Array.from(new Set((items ?? []).filter(Boolean)));

    if (allowMultipleOpen) {
        return normalized;
    }

    return normalized.slice(0, 1);
}

export default function Accordion({
    children,
    variant = "default",
    allowMultipleOpen = false,
    defaultOpenItems,
    openItems,
    onOpenItemsChange,
    className,
}: AccordionProps) {
    const [internalOpenItems, setInternalOpenItems] = useState<string[]>(() =>
        normalizeOpenItems(defaultOpenItems, allowMultipleOpen),
    );

    const isControlled = openItems !== undefined;
    const currentOpenItems = isControlled
        ? normalizeOpenItems(openItems, allowMultipleOpen)
        : normalizeOpenItems(internalOpenItems, allowMultipleOpen);
    const openItemSet = useMemo(() => new Set(currentOpenItems), [currentOpenItems]);

    const toggle = useCallback(
        (itemId: string) => {
            const isAlreadyOpen = openItemSet.has(itemId);
            let nextOpenItems: string[];

            if (isAlreadyOpen) {
                nextOpenItems = currentOpenItems.filter((id) => id !== itemId);
            } else if (allowMultipleOpen) {
                nextOpenItems = [...currentOpenItems, itemId];
            } else {
                nextOpenItems = [itemId];
            }

            if (!isControlled) {
                setInternalOpenItems(nextOpenItems);
            }

            onOpenItemsChange?.(nextOpenItems);
        },
        [allowMultipleOpen, currentOpenItems, isControlled, onOpenItemsChange, openItemSet],
    );

    const contextValue = useMemo(
        () => ({
            variant,
            isOpen: (itemId: string) => openItemSet.has(itemId),
            toggle,
        }),
        [openItemSet, toggle, variant],
    );

    return (
        <div
            className={[
                styles.accordion,
                variant === "glassy" ? styles.glassy : "",
                className ?? "",
            ]
                .filter(Boolean)
                .join(" ")}
        >
            <AccordionContext.Provider value={contextValue}>
                {children}
            </AccordionContext.Provider>
        </div>
    );
}
