import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "../form/icon-button/IconButton";
import styles from "./popup-menu.module.css";

export type MenuItemData = {
    label: string;
    icon?: ReactNode;
    disabled?: boolean;
    onClick: () => void;
};

type FlyoutMenuProps = {
    items: MenuItemData[];
};

export default function PopupMenu({ items }: FlyoutMenuProps) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;

        const handlePointerDown = (event: PointerEvent) => {
            if (!menuRef.current?.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setOpen(false);
        };

        document.addEventListener("pointerdown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [open]);

    const handleItemClick = (item: MenuItemData) => {
        if (item.disabled) return;
        item.onClick();
        setOpen(false);
    };

    return (
        <div className={styles.popupMenu} ref={menuRef}>
            <IconButton
                label="Weitere Optionen"
                icon={<MoreVertIcon />}
                frame={false}
                className={styles.triggerButton}
                aria-haspopup="menu"
                aria-expanded={open}
                onClick={() => setOpen((wasOpen) => !wasOpen)}
            />
            {open && (
                <div className={styles.menu} role="menu">
                    {items.map((item, index) => (
                        <button
                            key={`${item.label}-${index}`}
                            type="button"
                            role="menuitem"
                            className={styles.menuItem}
                            disabled={item.disabled}
                            onClick={() => handleItemClick(item)}
                        >
                            {item.icon && <span className={styles.itemIcon}>{item.icon}</span>}
                            <span>{item.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
