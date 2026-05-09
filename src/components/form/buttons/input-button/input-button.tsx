import type { ButtonHTMLAttributes, CSSProperties, MouseEvent, ReactNode } from "react";
import styles from "./input-button.module.css";


export type ButtonProps = {
    label: string;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
    variant?: "primary" | "secondary";
    colorToken?: string;
    icon?: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "onClick" | "disabled">;

export default function InputButton({
                                        label,
                                        onClick,
                                        type = "button",
                                        disabled = false,
                                        loading = false,
                                        fullWidth = false,
                                        variant = "primary",
                                        colorToken,
                                        icon,
                                        className = "",
                                        ...rest
                                    }: ButtonProps) {
    const isDisabled = disabled || loading;

    const styleButtonColor = {
        "--btn-color": `var(${colorToken})`,
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
                fullWidth ? styles.full : "",
                loading ? styles.loading : "",
                className,
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
