import type { InputHTMLAttributes } from "react";
import styles from "./Checkbox.module.css";

export type CheckboxProps = {
    label: string;
    name: string;
    error?: string;
    variant?: "glassy" | "default";
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

/**
 * A custom-styled checkbox component that supports error display and accessibility features.
 *
 * How to use it in your application:
 *
 * <Checkbox
 *   label="Ich akzeptiere die AGB"
 *   error={errors.acceptTerms?.message}
 *   {...register("acceptTerms")}
 * />
 */
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
                aria-describedby={error ? `${name}-error` : undefined}
                {...rest}
            />

            <label
                htmlFor={checkboxId}
                className={[
                    styles.checkboxLabel,
                    variant === "glassy" ? styles.checkboxLabelGlassy : "",
                ]
                    .filter(Boolean)
                    .join(" ")}
            >
                <span className={styles.customCheckbox} aria-hidden="true" />
                <span className={styles.checkboxText}>{label}</span>
            </label>

            {error && (
                <span id={`${name}-error`} className={styles.errorMessage}>
          {error}
        </span>
            )}
        </div>
    );
}
