import styles from "./counter.module.css";

type CounterProps = {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
};

export function Counter({
                            value,
                            onChange,
                            min = 0,
                            max = Infinity,
                            step = 1,
                            disabled = false,
                        }: CounterProps) {
    const decrement = () => {
        if (disabled) return;
        onChange(Math.max(value - step, min));
    };

    const increment = () => {
        if (disabled) return;
        onChange(Math.min(value + step, max));
    };

    return (
        <div className={styles.counter} onClick={(e) => e.stopPropagation()}>
            <button
                type="button"
                onClick={decrement}
                disabled={disabled || value <= min}
                className={styles.button}
            >
                –
            </button>

            <span className={styles.value}>{value}</span>

            <button
                type="button"
                onClick={increment}
                disabled={disabled || value >= max}
                className={styles.button}
            >
                +
            </button>
        </div>
    );
}
