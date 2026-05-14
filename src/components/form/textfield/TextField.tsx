import type {InputHTMLAttributes, Ref} from "react";
import styles from "./TextField.module.css";

export type TextFieldProps = {
    label: string;
    name: string;
    error?: string;
    variant?: "glassy" | "default";
    ref?: Ref<HTMLInputElement>;
} & InputHTMLAttributes<HTMLInputElement>;

/**
 * A reusable TextField component that can be used across the application.
 *
 * How to use it in your application:
 *
 * <TextField
 *   label="E-Mail"
 *   placeholder="deine@email.ch"
 *   variant="glassy"
 *   error={errors.email?.message}
 *   {...register("email")}
 * />
 */
export default function TextField({
                                      label,
                                      name,
                                      error,
                                      placeholder,
                                      variant = "default",
                                      className,
                                      ref,
                                      ...rest
                                  }: TextFieldProps) {
    return (
        <div className={styles.inputBlockVertical}>
            <label
                htmlFor={name}
                className={[
                    styles.inputLabel,
                    variant === "glassy" ? styles.inputLabelGlassy : "",
                ]
                    .filter(Boolean)
                    .join(" ")}
            >
                {label}
            </label>

            <input
                id={name}
                name={name}
                ref={ref}
                placeholder={placeholder}
                className={[
                    styles.inputTextField,
                    variant === "glassy" ? styles.inputTextFieldGlassy : "",
                    error ? styles.inputError : "",
                    className ?? "",
                ]
                    .filter(Boolean)
                    .join(" ")}
                aria-invalid={!!error}
                aria-describedby={error ? `${name}-error` : undefined}
                {...rest}
            />

            {error && (
                <span id={`${name}-error`} className={styles.errorMessage}>
                    {error}
                 </span>
            )}
        </div>
    );
}
