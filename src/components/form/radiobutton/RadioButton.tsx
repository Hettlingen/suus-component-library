import type { ChangeEvent, InputHTMLAttributes } from "react";
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
    value?: string;
    defaultValue?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "defaultValue" | "onChange">;

/**
 * A custom radio button group component that supports a "glassy" variant and displays error messages.
 *
 * How to use it in your application:
 *
 *  <RadioButton
 *      label="Label"
 *      name="optionsDefault"
 *      defaultValue="option1"
 *      options={[
 *          { label: "Option 1", value: "option1" },
 *          { label: "Option 2", value: "option2" },
 *          { label: "Option 3", value: "option3" },
 *      ]}
 *  />
 */
export default function RadioButton({
                                        label,
                                        name,
                                        options,
                                        error,
                                        variant = "default",
                                        disabled,
                                        value,
                                        defaultValue,
                                        onChange,
                                        ...rest
                                    }: RadioButtonProps) {
    const isControlled = value !== undefined;

    return (
        <div className="inputBlockVertical">
            <fieldset
                className={[
                    styles.radioGroup
                ]
                    .filter(Boolean)
                    .join(" ")}
                aria-invalid={!!error}
                aria-describedby={`${name}-error`}
            >
                {label && (
                    <label
                        htmlFor={name}
                        className={[
                            styles.inputLabel,
                            variant === "glassy" ? "--form-input-glassy-text-label" : "--form-input-default-text-label",
                        ]
                            .filter(Boolean)
                            .join(" ")}
                    >
                        {label}
                    </label>
                )}

                <div className={styles.optionGroup}>
                    {options.map((option) => {
                        const checkedProps = isControlled
                            ? { checked: value === option.value }
                            : { defaultChecked: defaultValue === option.value };

                        return (
                            <label
                                key={option.value}
                                className={[
                                    styles.optionWrapper,
                                    disabled ? styles.optionWrapperDisabled : "",
                                ]
                                    .filter(Boolean)
                                    .join(" ")}
                            >
                                <input
                                    type="radio"
                                    name={name}
                                    value={option.value}
                                    disabled={disabled}
                                    className={styles.radioInput}
                                    onChange={onChange}
                                    {...checkedProps}
                                    {...rest}
                                />

                                <span
                                    className={[
                                        styles.optionButton,
                                        variant === "glassy"
                                            ? styles.optionButtonGlassy
                                            : styles.optionButtonDefault,
                                        error ? styles.optionButtonError : "",
                                    ]
                                        .filter(Boolean)
                                        .join(" ")}
                                >
                                    <span className={styles.optionTitle}>
                                        {option.label}
                                    </span>

                                    {option.description && (
                                        <span className={styles.optionDescription}>
                                            {option.description}
                                        </span>
                                    )}
                                </span>
                            </label>
                        );
                    })}
                </div>

                <span
                    id={`${name}-error`}
                    className={[
                        styles.errorMessage,
                        !error ? styles.errorMessageHidden : "",
                    ]
                        .filter(Boolean)
                        .join(" ")}
                >
                    {error || "\u00a0"}
                </span>
            </fieldset>
        </div>
    );
}
