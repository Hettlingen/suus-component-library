import type { InputHTMLAttributes } from "react";
import styles from "./Switch.module.css";

export type SwitchProps = {
    name: string;
    label?: string;
    error?: string;
    variant?: "glassy" | "default";
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">;


/**
 * A reusable Switch component that can be used across the application.
 *
 * How to use it in your application with react-hook-form:
 *
 *  <Switch
 *    label="Newsletter abonnieren"
 *    error={errors.newsletter?.message}
 *    {...register("newsletter")}
 *  />
 *
 * How to use it in your application without react-hook-form:
 *  <Switch
 *    name="isActive"
 *    label="Aktiv"
 *    checked={isActive}
 *    onChange={(event) => setIsActive(event.target.checked)}
 *  />
 */
export default function Switch({
                                   name,
                                   id,
                                   label,
                                   error,
                                   variant = "default",
                                   className,
                                   disabled,
                                   ...rest
                               }: SwitchProps) {
    const switchId = id ?? `${name}-switch`;

    return (
        <div
            className={[
                styles.switchWrapper,
                className ?? "",
            ]
                .filter(Boolean)
                .join(" ")}
        >
            <input
                id={switchId}
                name={name}
                type="checkbox"
                disabled={disabled}
                className={styles.switchCheckbox}
                aria-invalid={!!error}
                aria-describedby={error ? `${name}-error` : undefined}
                {...rest}
            />

            <label
                htmlFor={switchId}
                className={[
                    styles.switchLabel,
                    variant === "glassy" ? styles.switchLabelGlassy : "",
                ]
                    .filter(Boolean)
                    .join(" ")}
            >
        <span className={styles.switchBackground}>
          <span className={styles.switchButton} aria-hidden="true">
            <span className={styles.iconChecked}>
              <CheckIcon />
            </span>

            <span className={styles.iconUnchecked}>
              <CloseIcon />
            </span>
          </span>
        </span>

                {label && <span className={styles.switchText}>{label}</span>}
            </label>

            {error && (
                <span id={`${name}-error`} className={styles.errorMessage}>
          {error}
        </span>
            )}
        </div>
    );
}

function CheckIcon() {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M3 6.5L5.5 9L9 3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function CloseIcon() {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M3 3L9 9M9 3L3 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}
