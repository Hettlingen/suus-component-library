import {
    useRef,
    type ChangeEvent,
    type InputHTMLAttributes,
    type Ref,
} from "react";
import styles from "./DatePicker.module.css";

export type DatePickerProps = {
    label: string;
    name: string;
    value?: Date | null;
    maxDate?: Date;
    minDate?: Date;
    error?: string;
    variant?: "glassy" | "default";
    ref?: Ref<HTMLInputElement>;
    onDateChange?: (date: Date | null) => void;
} & Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type" | "value" | "onChange" | "max" | "min"
>;

/**
 * A reusable DatePicker component that can be used across the application.
 *
 * How to use it in your application:
 * Use with state:
 *
 * const [birthday, setBirthday] = useState<Date | null>(null);
 *
 *  <DatePicker
 *    name="birthday"
 *    label="Geburtsdatum"
 *    value={birthday}
 *    onDateChange={setBirthday}
 *    error={errors.birthday?.message}
 *  />
 *
 * Use with react-hook-form:
 *  <Controller
 *    name="birthday"
 *    control={control}
 *    render={({ field, fieldState }) => (
 *      <DatePicker
 *        name={field.name}
 *        label="Geburtsdatum"
 *        value={field.value}
 *        onDateChange={field.onChange}
 *        onBlur={field.onBlur}
 *        error={fieldState.error?.message}
 *      />
 *    )}
 *  />
 */
export default function DatePicker({
                                       label,
                                       name,
                                       id,
                                       value = null,
                                       maxDate,
                                       minDate,
                                       error,
                                       variant = "default",
                                       className,
                                       ref,
                                       onDateChange,
                                       onBlur,
                                       disabled,
                                       ...rest
                                   }: DatePickerProps) {
    const inputId = id ?? name;
    const inputRef = useRef<HTMLInputElement | null>(null);

    const effectiveMaxDate = maxDate ?? new Date();

    function setInputElement(element: HTMLInputElement | null) {
        inputRef.current = element;

        if (typeof ref === "function") {
            ref(element);
        } else if (ref) {
            ref.current = element;
        }
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const nextValue = event.target.value;

        if (!nextValue) {
            onDateChange?.(null);
            return;
        }

        onDateChange?.(parseDateInputValue(nextValue));
    }

    function handleOpenPicker() {
        if (disabled) return;

        inputRef.current?.showPicker?.();
        inputRef.current?.focus();
    }

    return (
        <div className="inputBlockVertical">
            <label
                htmlFor={inputId}
                className={[
                    "inputLabel",
                    variant === "glassy" ? "inputLabelGlassy" : "",
                ]
                    .filter(Boolean)
                    .join(" ")}
            >
                {label}
            </label>

            <div className={styles.dateInputWrapper}>
                <input
                    id={inputId}
                    name={name}
                    ref={setInputElement}
                    type="date"
                    value={formatDateForInput(value)}
                    max={formatDateForInput(effectiveMaxDate)}
                    min={minDate ? formatDateForInput(minDate) : undefined}
                    disabled={disabled}
                    onChange={handleChange}
                    onBlur={onBlur}
                    className={[
                        styles.inputDateField,
                        variant === "glassy" ? styles.inputDateFieldGlassy : "",
                        error ? styles.inputError : "",
                        className ?? "",
                    ]
                        .filter(Boolean)
                        .join(" ")}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${name}-error` : undefined}
                    {...rest}
                />

                <button
                    type="button"
                    className={styles.calendarIconButton}
                    onClick={handleOpenPicker}
                    disabled={disabled}
                    aria-label="Datum auswählen"
                    tabIndex={-1}
                >
                    <CalendarIcon />
                </button>
            </div>

            {error && (
                <span id={`${name}-error`} className={styles.errorMessage}>
                    {error}
                </span>
            )}
        </div>
    );
}

function formatDateForInput(date?: Date | null): string {
    if (!date) return "";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function parseDateInputValue(value: string): Date {
    const [year, month, day] = value.split("-").map(Number);

    return new Date(year, month - 1, day);
}

function CalendarIcon() {
    return (
        <svg
            className={styles.icon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
        >
            <path d="M8 2V5" />
            <path d="M16 2V5" />
            <path d="M3.5 9.09H20.5" />
            <path d="M21 8.5V17.5C21 20 19.75 21.5 16.75 21.5H7.25C4.25 21.5 3 20 3 17.5V8.5C3 6 4.25 4.5 7.25 4.5H16.75C19.75 4.5 21 6 21 8.5Z" />
        </svg>
    );
}
