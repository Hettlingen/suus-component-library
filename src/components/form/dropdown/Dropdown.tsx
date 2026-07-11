import type { SelectHTMLAttributes } from "react";
import styles from "./Dropdown.module.css";

export type DropDownItem = {
    label: string;
    value: string;
};

export type DropdownProps = {
    label: string;
    name: string;
    options: DropDownItem[];
    placeholder?: string;
    error?: string;
    variant?: "glassy" | "default";
} & SelectHTMLAttributes<HTMLSelectElement>;

/**
 * A reusable Dropdown component that can be used across the application.
 *
 * How to use it in your application:
 *
 * <Dropdown
 *   label="Geschmack"
 *   placeholder="Bitte auswählen"
 *   error={errors.flavour?.message}
 *   options={[
 *     { label: "Sugarcane", value: "sugarcane" },
 *     { label: "Tamarind", value: "tamarind" },
 *     { label: "Guaraná", value: "guarana" },
 *     { label: "Ice Tea", value: "icetea" },
 *   ]}
 *   {...register("flavour")}
 * />
 */
export default function Dropdown({
                                     label,
                                     name,
                                     options,
                                     placeholder,
                                     error,
                                     variant = "default",
                                     className,
                                     disabled,
                                     ...rest
                                 }: DropdownProps) {
    return (
        <div className="inputBlockVertical">
            <label
                htmlFor={name}
                className={[
                    "inputLabel",
                    variant === "glassy" ? "inputLabelGlassy" : "",
                ]
                    .filter(Boolean)
                    .join(" ")}
            >
                {label}
            </label>

            <select
                id={name}
                name={name}
                disabled={disabled}
                className={[
                    styles.inputSelectField,
                    variant === "glassy" ? styles.inputSelectFieldGlassy : "",
                    error ? styles.inputError : "",
                    className ?? "",
                ]
                    .filter(Boolean)
                    .join(" ")}
                aria-invalid={!!error}
                aria-describedby={`${name}-error`}
                {...rest}
            >
                {placeholder && (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                )}

                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>

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
        </div>
    );
}
