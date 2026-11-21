import type { ReactNode } from "react";
import { ArrowLeftIcon } from "../icons/ArrowLeftIcon";
import { CloseIcon } from "../icons/CloseIcon";
import styles from "./panel.module.css";

export interface PanelProps {
    title?: string;
    children: ReactNode;
    variant?: "default" | "glassy";
    className?: string;
    /** Zeigt das Zurück-Icon und führt den Callback beim Klick aus. */
    onClickBack?: () => void;
    /** Zeigt das Schliessen-Icon und führt den Callback beim Klick aus. */
    onClickClose?: () => void;
}

export function Panel({
    title,
    children,
    variant = "default",
    className,
    onClickBack,
    onClickClose,
}: PanelProps) {
    return (
        <div
            className={[
                styles["panel-container"],
                variant === "glassy" ? styles.glassy : "",
                className,
            ]
                .filter(Boolean)
                .join(" ")}
        >
            {(title || onClickBack || onClickClose) && (
                <div className={styles["panel-header"]}>
                    {onClickBack && (
                        <button type="button" className={`${styles.icon} ${styles.left}`}
                                onClick={onClickBack} aria-label="Zurück">
                            <ArrowLeftIcon width={40} height={40} />
                        </button>
                    )}
                    <h1 className={styles["panel-title-new"]}>{title}</h1>
                    {onClickClose && (
                        <button type="button" className={`${styles.icon} ${styles.right}`}
                                onClick={onClickClose} aria-label="Schliessen">
                            <CloseIcon width={40} height={40} />
                        </button>
                    )}
                </div>
            )}

            <div className={styles["panel-content"]}>
                {children}
            </div>
        </div>
    );
}
