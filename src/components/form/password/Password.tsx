import {type InputHTMLAttributes, type Ref, useState} from "react";
import styles from "./Password.module.css";

export type PasswordProps = {
    label?: string;
    name: string;
    error?: string;
    variant?: "glassy" | "default";
    ref?: Ref<HTMLInputElement>;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

/**
 * A reusable Password input component that can be used across the application.
 *
 * Usage with react-hook-form:
 *
 * <Password
 *   label="Passwort"
 *   placeholder="Dein Passwort"
 *   error={errors.password?.message}
 *   {...register("password")}
 * />
 */
export default function Password({
                                     label,
                                     name,
                                     id,
                                     error,
                                     variant = "default",
                                     className,
                                     disabled,
                                     ref,
                                     autoComplete = "current-password",
                                     ...rest
                                 }: PasswordProps) {
    const [showPassword, setShowPassword] = useState(false);

    const inputId = id ?? name;

    function togglePasswordVisibility() {
        setShowPassword((prev) => !prev);
    }

    return (
        <div className="inputBlockVertical">
            {label && (
                <label
                    htmlFor={inputId}
                    className={[
                        "inputLabel",
                        variant === "glassy" ? "inputLabelGlassy" : "",
                    ]
                        .filter(Boolean)
                        .join(" ")}
                >
                    {label}
                </label>
            )}

            <div className={styles.passwordInputWrapper}>
                <input
                    id={inputId}
                    name={name}
                    ref={ref}
                    type={showPassword ? "text" : "password"}
                    disabled={disabled}
                    autoComplete={autoComplete}
                    className={[
                        styles.inputTextField,
                        variant === "glassy" ? styles.inputTextFieldGlassy : "",
                        error ? styles.inputError : "",
                        className ?? "",
                    ]
                        .filter(Boolean)
                        .join(" ")}
                    aria-invalid={!!error}
                    aria-describedby={`${name}-error`}
                    {...rest}
                />

                <button
                    type="button"
                    className={styles.togglePasswordButton}
                    onClick={togglePasswordVisibility}
                    disabled={disabled}
                    aria-label={showPassword ? "Passwort ausblenden" : "Passwort anzeigen"}
                    aria-pressed={showPassword}
                >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
            </div>

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

function EyeIcon() {
    return (
        <svg
            className={styles.icon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
        >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}

function EyeOffIcon() {
    return (
        <svg
            className={styles.icon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
        >
            <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C7 20 2.73 16.11 1 12c.74-1.64 1.82-3.06 3.11-4.24m3.52-2.42A10.94 10.94 0 0 1 12 4c5 0 9.27 3.89 11 8-1.1 2.42-2.91 4.5-5.06 5.94M1 1l22 22" />
        </svg>
    );
}
