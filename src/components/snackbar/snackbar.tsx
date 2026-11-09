import styles from './snackbar.module.css';
import {useEffect} from 'react';

export interface SnackbarProps {
    message: string;
    isOpen: boolean;
    onClose: () => void;
    duration?: number;
    type?: 'success' | 'info' | 'warning' | 'error';
    title?: string;
    dismissOn?: 'duration' | 'close' | 'action';
    actionLabel?: string;
}

export default function Snackbar({
    message,
    isOpen,
    onClose,
    duration = 5000,
    type = 'info',
    title,
    dismissOn = 'duration',
    actionLabel = 'CLICK ME',
}: SnackbarProps) {
    useEffect(() => {
        if (isOpen && dismissOn === 'duration') {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isOpen, duration, dismissOn, onClose]);

    if (!isOpen) return null;

    const titles = {
        info: 'Information',
        success: 'Success',
        warning: 'Warning',
        error: 'Error',
    };

    return (
        <div className={`${styles.snackbar} ${styles[`snackbar--${type}`]}`}>
            <span className={styles.icon} aria-hidden="true">
                {type === 'success' ? (
                    <svg viewBox="0 0 32 32"><path d="m5 16 7 7L27 8" /></svg>
                ) : type === 'warning' ? (
                    <svg viewBox="0 0 32 32"><path d="M16 3 30 28H2L16 3Z" /><path d="M16 11v8m0 4v.1" /></svg>
                ) : (
                    <svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="13" /><path d={type === 'error' ? 'M16 8v10m0 5v.1' : 'M16 14v8m0-14v.1'} /></svg>
                )}
            </span>
            <span className={styles.content}>
                <strong className={styles.title}>{title ?? titles[type]}</strong>
                <span className={styles.message}>{message}</span>
            </span>
            {dismissOn === 'action' && (
                <button className={styles.action} type="button" onClick={onClose}>
                    {actionLabel}
                </button>
            )}
            <button className={styles.close} type="button" onClick={onClose} aria-label="Snackbar schließen">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 5 14 14M19 5 5 19" /></svg>
            </button>
        </div>
    );
};
