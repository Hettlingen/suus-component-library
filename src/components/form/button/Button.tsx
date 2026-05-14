import type {ButtonHTMLAttributes, CSSProperties, MouseEvent, ReactNode} from "react";
import styles from "./Button.module.css";

export type ColorToken =
    | "--colors-juice-sugarcane"
    | "--colors-juice-tamarind"
    | "--colors-juice-guava"
    | "--colors-juice-icetea";

export type ButtonProps = {
    label: string;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    loading?: boolean;
    variant?: "primary" | "secondary";
    colorToken?: ColorToken;
    icon?: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "onClick" | "disabled">;

/**
 * A customizable button component that supports different variants, loading states, and color tokens.
 */
export default function Button({
                                        label,
                                        onClick,
                                        type = "button",
                                        disabled = false,
                                        loading = false,
                                        variant = "primary",
                                        colorToken = "--colors-juice-sugarcane",
                                        icon,
                                        ...rest
                                    }: ButtonProps) {
    const isDisabled = disabled || loading;

    const styleButtonColor = {
        "--button-background-color": `var(${colorToken})`,
    } as CSSProperties;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isDisabled}
            style={styleButtonColor}
            className={[
                styles.suusButton,
                styles[variant],
                loading ? styles.loading : "",
            ]
                .filter(Boolean)
                .join(" ")}
            aria-busy={loading}
            {...rest}
        >
            {loading ? (
                <span
                    className={`${styles.loader} ${variant === "primary" ? "" : styles.loaderSecondary}`}
                    aria-hidden="true"
                />
            ) : (
                <>
                    {icon ? <span className={styles.icon}>{icon}</span> : null}
                    <span className={styles.label}>{label}</span>
                </>
            )}
        </button>
    );
}
