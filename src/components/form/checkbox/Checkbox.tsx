import type { InputHTMLAttributes, ReactNode } from "react";
import styles from "./Checkbox.module.css";

export type CheckboxProps = {
    label: ReactNode;
    name: string;
    error?: string;
    variant?: "default" | "glassy";
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export default function Checkbox({
                                     label,
                                     name,
                                     id,
                                     error,
                                     variant = "default",
                                     className,
                                     disabled,
                                     ...rest
                                 }: CheckboxProps) {
    const checkboxId = id ?? `${name}-checkbox`;

    return (
        <div
            className={[
                styles.checkboxWrapper,
                variant === "glassy" ? styles.checkboxWrapperGlassy : "",
                error ? styles.checkboxWrapperError : "",
                disabled ? styles.checkboxWrapperDisabled : "",
                className ?? "",
            ]
                .filter(Boolean)
                .join(" ")}
        >
            <input
                type="checkbox"
                id={checkboxId}
                name={name}
                disabled={disabled}
                className={styles.checkboxInput}
                aria-invalid={!!error}
                aria-describedby={`${name}-error`}
                {...rest}
            />

            <label htmlFor={checkboxId} className={styles.checkboxLabel}>
        <span className={styles.customCheckbox} aria-hidden="true">
          <svg
              className={styles.checkIcon}
              viewBox="0 0 24 24"
              focusable="false"
              aria-hidden="true"
          >
            <path d="M20 6L9 17L4 12" />
          </svg>
        </span>

                <span className={styles.checkboxText}>{label}</span>
            </label>

            <span
                id={`${name}-error`}
                className={[
                    styles.errorMessage,
                    !error ? styles.errorMessageHidden : "",
                ]
                    .filter(Boolean)
                    .join(" ")}
            >
                {error || "\u00a0"}
            </span>
        </div>
    );
}
