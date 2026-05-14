import type { HTMLAttributes, ReactNode } from "react";
import styles from "./Chip.module.css";

export type ChipProps = {
    children: ReactNode;
    variant?: "glassy" | "default";
} & HTMLAttributes<HTMLSpanElement>;


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
                                 className,
                                 ...rest
                             }: ChipProps) {
    return (
        <span
            className={[
                styles.chip,
                variant === "glassy" ? styles.chipGlassy : "",
                className ?? "",
            ]
                .filter(Boolean)
                .join(" ")}
            {...rest}
        >
      {children}
    </span>
    );
}
