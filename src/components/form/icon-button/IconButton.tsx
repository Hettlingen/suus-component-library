import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./IconButton.module.css";

export type IconButtonProps = {
    label: string;
    icon: ReactNode;
    variant?: "default" | "glassy";
    frame?: boolean;
    active?: boolean;
    size?: "small" | "default" | "large";
} & ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * A reusable icon button component that can be used across the application.
 *
 * How to use it:
 *
 * <IconButton
 *   label="Bearbeiten"
 *   icon={<PenIcon />}
 *   onClick={() => setIsEditing(true)}
 * />
 */
export default function IconButton({
                                       label,
                                       icon,
                                       variant = "default",
                                       frame = true,
                                       active = false,
                                       size = "default",
                                       className,
                                       type = "button",
                                       disabled,
                                       ...rest
                                   }: IconButtonProps) {
    return (
        <button
            type={type}
            aria-label={label}
            title={label}
            aria-pressed={active}
            disabled={disabled}
            className={[
                styles.iconButton,
                frame ? styles.withFrame : styles.withoutFrame,
                variant === "glassy" ? styles.glassy : "",
                active ? styles.active : "",
                size === "small" ? styles.small : "",
                size === "large" ? styles.large : "",
                className ?? "",
            ]
                .filter(Boolean)
                .join(" ")}
            {...rest}
        >
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
        </button>
    );
}
