import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import styles from "./Link.module.css";

export type LinkProps = {
    children: ReactNode;
    href?: string;
    newTab?: boolean;
    showArrow?: boolean;
    variant?: "default" | "glassy";
} & AnchorHTMLAttributes<HTMLAnchorElement>;


/**
 * A reusable Link component that can be used across the application.
 *
 * How to use it in your application:
 *
 * Link mit Pfeil-Icon:
 * <Link href="/shop">
 *   Zum Shop
 * </AppLink>
 *
 * Link ohne Pfeil-Icon:
 * <Link href="/shop" showArrow={false}>
 *   Zum Shop
 * </AppLink>
 *
 * Link and show content in new browser-tab:
 * <Link href="https://suus.ch" newTab>
 *   SUUS besuchen
 * </AppLink>
 *
 * Link mit action without navigation
 * <Link onClick={() => console.log("Klick")}>
 *   Mehr anzeigen
 * </AppLink>
 */
export default function Link({
                                    children,
                                    href,
                                    onClick,
                                    newTab = false,
                                    showArrow = true,
                                    variant = "default",
                                    className,
                                    ...rest
                                }: LinkProps) {
    function handleClick(event: MouseEvent<HTMLAnchorElement>) {
        if (!href) {
            event.preventDefault();
        }

        onClick?.(event);
    }

    return (
        <a
            href={href ?? "#"}
            onClick={handleClick}
            target={href && newTab ? "_blank" : undefined}
            rel={href && newTab ? "noopener noreferrer" : undefined}
            className={[
                styles.appLink,
                variant === "glassy" ? styles.appLinkGlassy : "",
                className ?? "",
            ]
                .filter(Boolean)
                .join(" ")}
            {...rest}
        >
            <span className={styles.label}>{children}</span>

            {showArrow && (
                <span className={styles.icon} aria-hidden="true">
          <ArrowRightIcon />
        </span>
            )}
        </a>
    );
}

function ArrowRightIcon() {
    return (
        <svg
            className={styles.arrowIcon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
        >
            <path d="M5 12H19" />
            <path d="M13 6L19 12L13 18" />
        </svg>
    );
}
