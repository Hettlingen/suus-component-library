import type { ReactNode } from "react";
import styles from "./panel.module.css";

export type PanelProps = {
    children: ReactNode;
    className?: string;
};

export function Panel({ children, className }: PanelProps) {
    return <div className={[styles.panel, className].filter(Boolean).join(" ")}>{children}</div>;
}
