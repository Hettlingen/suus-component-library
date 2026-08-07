import styles from './snackbar.module.css';
import {useEffect} from "react";

export interface SnackbarProps {
    message: string;
    isOpen: boolean;
    onClose: () => void;
    duration?: number;
    type?: 'success' | 'info' | 'warning' | 'error';
}

function Snackbar({
                      message,
                      isOpen,
                      onClose,
                      duration = 5000,
                      type = 'info'
                  } : SnackbarProps) {
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isOpen, duration, onClose]);

    if (!isOpen) return null;

    return (
        <div className={`${styles.snackbar} ${styles[`snackbar--${type}`]}`}>
            {message}
        </div>
    );
};

export default Snackbar
