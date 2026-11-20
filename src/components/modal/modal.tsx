import React, { useRef, useEffect } from "react";
import styles from "./modal.module.css";

export type ModalProps = {
    open: boolean;
    title?: string;
    appearance?: "default" | "glass";
    onClose: () => void;
    children: React.ReactNode;
};

export function Modal({
                          open,
                          title,
                          appearance = "default",
                          onClose,
                          children,
                      }: ModalProps) {
    const ref = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
        const d = ref.current;
        if (!d) return;
        if (open && !d.open) d.showModal();
        if (!open && d.open) d.close();
    }, [open]);

    return (
        <dialog
            ref={ref}
            className={`${styles.simpleModal} ${appearance === "glass" ? styles.glassModal : ""}`}
            onClose={onClose}
            onClick={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <div className={styles.simpleModalHeader}>
                {title && <h2 className={styles.title}>{title}</h2>}
                <button
                    type="button"
                    className={styles.simpleModalClose}
                    onClick={onClose}
                    aria-label="Schliessen"
                >
                    ×
                </button>
            </div>

            <div className={styles.simpleModalBody}>
                {children}
            </div>
        </dialog>
    );
}
