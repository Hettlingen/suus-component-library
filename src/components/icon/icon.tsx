import styles from './icon.module.css'

export type IconProps = {
    icon: React.ReactNode;           // z.B. ein Lucide- oder Material-Icon
    badgeCount?: number;             // Wenn 0 oder undefined, kein Badge
    size?: number;                   // Icon-Größe (optional)
    badgeColor?: string;            // Farbe des Badges (optional)
    className?: string;             // Zusätzliche Klassen für Wrapper
};

export default function Icon({
                  icon,
                  badgeCount,
                  size = 32,
                  badgeColor = "green",
              } : IconProps ) {
    const isLargeIcon = size >= 48;
    const badgeLabel = badgeCount !== undefined && badgeCount > 99 ? "99+" : badgeCount;

    return (
        <div className={`relative inline-block ${styles.icon}`} style={{ width: size, height: size }}>
            {icon}
            {badgeCount !== undefined && badgeCount > 0 && (
                <span
                    className={`${styles.badge} ${isLargeIcon ? styles.badgeLarge : ""}`}
                    style={{ backgroundColor: badgeColor }}
                >
                    {badgeLabel}
                </span>
            )}
        </div>
    )
}
