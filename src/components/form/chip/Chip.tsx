import { useState } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Chip.module.css";

export type ChipProps = {
    children: ReactNode;
    variant?: "glassy" | "default";
    /** If true the chip can be toggled (clickable). If false it renders as a non-interactive span. */
    clickable?: boolean;
    /** Controlled checked state. If provided the component is controlled. */
    checked?: boolean;
    /** Uncontrolled initial checked state. */
    defaultChecked?: boolean;
    /** Called with the new checked state when the chip is toggled. */
    onCheckedChange?: (checked: boolean) => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;


/**
 * A reusable Chip component that can be used across the application.
 *
 * How to use it in your application:
 *
 * <Chip>Bio</Chip>
 * <Chip variant="glassy">Sugarcane</Chip>
 * <Chip className={styles.myCustomChip}>Limited Edition</Chip>
 *
 * ODER:
 *
 * <div className="chips">
 *    {(profile.interests ?? []).map((interest) => (
 *       <Chip key={interest.label}>{interest.label.toUpperCase()}</Chip>
 *    ))}
 * </div>
 */
export default function Chip({
    children,
    variant = "default",
    clickable = true,
    checked,
    defaultChecked = false,
    onCheckedChange,
    className,
    ...rest
}: ChipProps) {
    const [internalChecked, setInternalChecked] = useState<boolean>(defaultChecked);

    const isControlled = typeof checked === "boolean";
    const currentChecked = isControlled ? (checked as boolean) : internalChecked;

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        if (!clickable) return;

        const next = !currentChecked;

        if (!isControlled) {
            setInternalChecked(next);
        }

        onCheckedChange?.(next);
        // If user passed an onClick via rest, call it
        rest.onClick?.(event);
    }

    const variantClass = variant === "glassy" ? styles.chipGlassy : styles.chipDefault;
    const checkedClass = currentChecked ? styles.chipChecked : "";
    const disabledClass = !clickable ? styles.chipDisabled : "";

    if (!clickable) {
        return (
            <span
                className={[styles.chip, variantClass, checkedClass, disabledClass, className ?? ""]
                    .filter(Boolean)
                    .join(" ")}
            >
                {children}
            </span>
        );
    }

    return (
        <button
            type="button"
            aria-pressed={currentChecked}
            className={[styles.chip, variantClass, checkedClass, className ?? ""]
                .filter(Boolean)
                .join(" ")}
            onClick={handleClick}
            {...rest}
        >
            {children}
        </button>
    );
}

