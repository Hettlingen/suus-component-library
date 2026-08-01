import {useContext, useId, useState, type ButtonHTMLAttributes, type MouseEvent, type ReactNode} from "react";
import {AccordionContext, type AccordionVariant} from "../accordion-context";
import styles from "./tile-accordion.module.css";

export type TileAccordionProps = {
    itemId?: string;
    label: ReactNode;
    icon?: ReactNode;
    children: ReactNode;
    variant?: AccordionVariant;
    defaultOpen?: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export default function TileAccordion({
    itemId,
    label,
    icon,
    children,
    variant,
    defaultOpen = false,
    className,
    disabled,
    onClick,
    ...rest
}: TileAccordionProps) {
    const accordionContext = useContext(AccordionContext);
    const generatedId = useId();
    const resolvedItemId = itemId ?? generatedId;

    const [standaloneOpen, setStandaloneOpen] = useState<boolean>(defaultOpen);

    const activeVariant = variant ?? accordionContext?.variant ?? "default";
    const isOpen = accordionContext ? accordionContext.isOpen(resolvedItemId) : standaloneOpen;

    const triggerId = `${resolvedItemId}-trigger`;
    const contentId = `${resolvedItemId}-content`;

    function handleToggle(event: MouseEvent<HTMLButtonElement>) {
        if (!disabled) {
            if (accordionContext) {
                accordionContext.toggle(resolvedItemId);
            } else {
                setStandaloneOpen((prev) => !prev);
            }
        }

        onClick?.(event);
    }

    return (
        <div
            className={[
                styles.tile,
                activeVariant === "glassy" ? styles.tileGlassy : styles.tileDefault,
                isOpen ? styles.tileOpen : "",
                className ?? "",
            ]
                .filter(Boolean)
                .join(" ")}
        >
            <button
                type="button"
                id={triggerId}
                className={[
                    styles.trigger,
                    activeVariant === "glassy" ? styles.triggerGlassy : styles.triggerDefault,
                ]
                    .filter(Boolean)
                    .join(" ")}
                onClick={handleToggle}
                aria-expanded={isOpen}
                aria-controls={contentId}
                disabled={disabled}
                {...rest}
            >
                <span className={styles.labelGroup}>
                    {icon ? <span className={styles.icon}>{icon}</span> : null}
                    <span className={styles.label}>{label}</span>
                </span>
                <span className={styles.indicator} aria-hidden="true">
                    {isOpen ? "-" : "+"}
                </span>
            </button>

            {isOpen ? (
                <div
                    id={contentId}
                    role="region"
                    aria-labelledby={triggerId}
                    className={[
                        styles.content,
                        activeVariant === "glassy" ? styles.contentGlassy : styles.contentDefault,
                    ]
                        .filter(Boolean)
                        .join(" ")}
                >
                    {children}
                </div>
            ) : null}
        </div>
    );
}
