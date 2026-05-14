import { useState, type InputHTMLAttributes, type Ref, type CSSProperties } from "react";
import styles from "./Password.module.css";

export type ProductColorToken =
    | "--colors-juice-sugarcane"
    | "--colors-juice-tamarind"
    | "--colors-juice-guava"
    | "--colors-juice-icetea";

export type PasswordProps = {
    label?: string;
    name: string;
    error?: string;
    variant?: "glassy" | "default";
    colorToken?: ProductColorToken;
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
                                     colorToken = "--colors-juice-sugarcane",
                                     className,
                                     disabled,
                                     ref,
                                     autoComplete = "current-password",
                                     ...rest
                                 }: PasswordProps) {
    const [showPassword, setShowPassword] = useState(false);

    const inputId = id ?? name;

    const passwordStyle = {
        "--password-accent-color": `var(${colorToken})`,
    } as CSSProperties;

    function togglePasswordVisibility() {
        setShowPassword((prev) => !prev);
    }

    return (
        <div className={styles.inputBlockVertical} style={passwordStyle}>
            {label && (
                <label
                    htmlFor={inputId}
                    className={[
                        styles.inputLabel,
                        variant === "glassy" ? styles.inputLabelGlassy : "",
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
                    aria-describedby={error ? `${name}-error` : undefined}
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

            {error && (
                <span id={`${name}-error`} className={styles.errorMessage}>
          {error}
        </span>
            )}
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
