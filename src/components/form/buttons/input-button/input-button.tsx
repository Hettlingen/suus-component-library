import type { ButtonHTMLAttributes, CSSProperties, MouseEvent, ReactNode } from "react";
import "./input-button.css";

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
                                        colorToken = "--colorProductSugarcane",
                                        icon,
                                        className = "",
                                        ...rest
                                    }: ButtonProps) {
    const isDisabled = disabled || loading;

    const style = {
        "--btn-color": `var(${colorToken})`,
    } as CSSProperties;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isDisabled}
            style={style}
            className={[
                "suus-button",
                `suus-button--${variant}`,
                fullWidth ? "btn--full" : "",
                loading ? "btn--loading" : "",
                className,
            ]
                .filter(Boolean)
                .join(" ")}
            aria-busy={loading}
            {...rest}
        >
            {loading ? (
                <span
                    className={`btn__loader ${variant === "primary" ? "btn__loader--primary" : "btn__loader--secondary"}`}
                    aria-hidden="true"
                />
            ) : (
                <>
                    {icon ? <span className="btn__icon">{icon}</span> : null}
                    <span className={`btn__label ${variant === "primary" ? "btn__loader--primary" : "btn__loader--secondary"}`}>{label}</span>
                </>
            )}
        </button>
    );
}
