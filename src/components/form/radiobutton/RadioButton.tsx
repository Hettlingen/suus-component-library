import type { InputHTMLAttributes } from "react";
import styles from "./RadioButton.module.css";

export type RadioButtonOption = {
    label: string;
    value: string;
    description?: string;
};

export type RadioButtonProps = {
    label?: string;
    name: string;
    options: RadioButtonOption[];
    error?: string;
    variant?: "glassy" | "default";
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">;


/**
 * A custom radio button group component that supports a "glassy" variant and displays error messages.
 *
 * How to use it in your application:
 *
 * <RadioButton
 *   label="Lieferart"
 *   error={errors.deliveryType?.message}
 *   options={[
 *     {
 *       label: "Abholung",
 *       value: "pickup",
 *       description: "Du holst deine Bestellung selbst ab.",
 *     },
 *     {
 *       label: "Lieferung",
 *       value: "delivery",
 *       description: "Wir liefern deine Bestellung zu dir.",
 *     },
 *   ]}
 *   {...register("deliveryType")}
 * />
 */
export default function RadioButton({
                                        label,
                                        name,
                                        options,
                                        error,
                                        variant = "default",
                                        className,
                                        disabled,
                                        ...rest
                                    }: RadioButtonProps) {
    return (
        <fieldset
            className={[
                styles.inputBlockVertical,
                className ?? "",
            ]
                .filter(Boolean)
                .join(" ")}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
        >
            {label && (
                <legend
                    className={[
                        styles.inputLabel,
                        variant === "glassy" ? styles.inputLabelGlassy : "",
                    ]
                        .filter(Boolean)
                        .join(" ")}
                >
                    {label}
                </legend>
            )}

            <div className={styles.optionCardGroup}>
                {options.map((option) => (
                    <label key={option.value} className={styles.optionCardLabelWrapper}>
                        <input
                            type="radio"
                            name={name}
                            value={option.value}
                            disabled={disabled}
                            className={styles.srOnlyRadio}
                            {...rest}
                        />

                        <span
                            className={[
                                styles.optionCard,
                                variant === "glassy" ? styles.optionCardGlassy : "",
                                error ? styles.optionCardError : "",
                            ]
                                .filter(Boolean)
                                .join(" ")}
                        >
              <span className={styles.optionCardTitle}>{option.label}</span>

                            {option.description && (
                                <span className={styles.optionCardDescription}>
                  {option.description}
                </span>
                            )}
            </span>
                    </label>
                ))}
            </div>

            {error && (
                <span id={`${name}-error`} className={styles.errorMessage}>
          {error}
        </span>
            )}
        </fieldset>
    );
}
