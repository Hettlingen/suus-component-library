import type {MouseEvent, ReactNode} from "react";
import Button from "../form/button/Button";
import Link from "../form/link/Link";
import styles from "./message-dialog.module.css";

export type MessageDialogType = "SUCCESS" | "INFO" | "WARNING" | "ERROR";

export type MessageDialogProps = {
    type: MessageDialogType;
    variant?: "glassy" | "default";
    title: string;
    description: string;
    primaryButtonLabel?: string;
    onPrimaryButtonClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    secondaryLinkLabel?: string;
    onSecondaryLinkClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
    onClose?: () => void;
    className?: string;
};

const ICONS: Record<MessageDialogType, ReactNode> = {
    SUCCESS: <path d="M30 52L46 68L74 36"/>,
    INFO: <path d="M50 46V72M50 30V32"/>,
    WARNING: <path d="M50 28V54M50 70V72"/>,
    ERROR: <path d="M34 34L66 66M66 34L34 66"/>,
};

/**
 * Card that informs the user about the result of an action (success, info, warning, error)
 * with optional primary button, secondary link and close icon.
 */
export function MessageDialog({
                               type,
                               variant = "default",
                               title,
                               description,
                               primaryButtonLabel,
                               onPrimaryButtonClick,
                               secondaryLinkLabel,
                               onSecondaryLinkClick,
                               onClose,
                               className,
                           }: MessageDialogProps) {
    const isGlassy = variant === "glassy";

    return (
        <section
            role={type === "ERROR" || type === "WARNING" ? "alert" : "status"}
            className={[
                styles.card,
                isGlassy ? styles.glassy : styles.default,
                styles[type.toLowerCase()],
                className,
            ].filter(Boolean).join(" ")}
        >
            {onClose && (
                <button type="button" className={styles.close} onClick={onClose} aria-label="Schliessen">
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M4 4L20 20M20 4L4 20"/>
                    </svg>
                </button>
            )}

            <svg className={styles.illustration} viewBox="0 0 100 100" aria-hidden="true">
                <circle className={styles.circle} cx="50" cy="50" r="48"/>
                <g className={styles.symbol}>{ICONS[type]}</g>
            </svg>

            <h2 className={styles.title}>{title}</h2>
            <p className={styles.description}>{description}</p>

            {(primaryButtonLabel || secondaryLinkLabel) && (
                <div className={styles.actions}>
                    {primaryButtonLabel && (
                        <div className={styles.primary}>
                            <Button
                                label={primaryButtonLabel}
                                variant="secondary"
                                onClick={onPrimaryButtonClick}
                            />
                        </div>
                    )}
                    {secondaryLinkLabel && (
                        <Link
                            variant={isGlassy ? "glassy" : "default"}
                            showArrow={false}
                            onClick={onSecondaryLinkClick}
                        >
                            {secondaryLinkLabel}
                        </Link>
                    )}
                </div>
            )}
        </section>
    );
}
