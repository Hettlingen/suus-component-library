import {
    useEffect,
    useId,
    useRef,
    useState,
    type ChangeEvent,
    type InputHTMLAttributes,
    type Ref,
} from "react";
import styles from "./PostalCode.module.css";

export type PostalCodeLocality = {
    postalCode: string;
    name: string;
};

export type PostalCodeSuggestion = {
    label: string;
    postalCode: string;
    locality: string;
};

export type PostalCodeProps = {
    label: string;
    name: string;
    error?: string;
    variant?: "glassy" | "default";
    ref?: Ref<HTMLInputElement>;
    onValueChange?: (value: string) => void;
    onSuggestionSelect?: (suggestion: PostalCodeSuggestion) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">;


/**
 * Ein React-Komponente für die Eingabe von Schweizer Postleitzahlen mit Autovervollständigung.
 *
 * Diese Komponente ermöglicht es Benutzern, eine Schweizer Postleitzahl oder einen Ortsnamen einzugeben.
 * Während der Eingabe werden passende Vorschläge aus der OpenPLZAPI (https://www.openplzapi.org/de/) angezeigt.
 * Es gibt auch Validierungsfeedback, ob die eingegebene Postleitzahl gültig ist oder nicht.
 *
 * How to use it in your application:
 *
 * Use without react-hook-form:
 *
 *  const [postalCode, setPostalCode] = useState("");
 *
 *  <PostalCode
 *    name="postalCode"
 *    label="PLZ oder Ort"
 *    onValueChange={setPostalCode}
 *    onSuggestionSelect={(suggestion) => {
 *      console.log(suggestion.postalCode);
 *      console.log(suggestion.locality);
 *    }}
 *  />
 *
 *  Use with react-hook-form:
 *
 *   <Controller
 *    name="postalCode"
 *    control={control}
 *    render={({ field, fieldState }) => (
 *      <PostalCode
 *        name={field.name}
 *        label="PLZ oder Ort"
 *        value={field.value ?? ""}
 *        onValueChange={field.onChange}
 *        onBlur={field.onBlur}
 *        error={fieldState.error?.message}
 *        onSuggestionSelect={(suggestion) => {
 *          field.onChange(suggestion.label);
 *        }}
 *      />
 *    )}
 *  />
 */
export default function PostalCode({
                                       label,
                                       name,
                                       id,
                                       error,
                                       variant = "default",
                                       className,
                                       disabled,
                                       placeholder = "z.B. 8001 oder Zürich",
                                       ref,
                                       onChange,
                                       onBlur,
                                       onValueChange,
                                       onSuggestionSelect,
                                       ...rest
                                   }: PostalCodeProps) {
     const generatedId = useId();
     const inputId = id ?? `${name}-${generatedId}`;

     const inputRef = useRef<HTMLInputElement | null>(null);
     const isSelectionRef = useRef(false);

    const [value, setValue] = useState("");
    const [suggestions, setSuggestions] = useState<PostalCodeSuggestion[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

     // Check if input is in format "XXXX Ort" (postal code + locality)
     const fullFormatMatch = value.trim().match(/^(\d+)\s+(.+)$/);
     const isFullFormat = !!fullFormatMatch;
     const fullFormatPostalCode = fullFormatMatch?.[1];
     const fullFormatLocality = fullFormatMatch?.[2];

     // Validate full format: check if this exact combination exists in suggestions
     const isValidFullFormat =
         isFullFormat &&
         suggestions.some(
             (suggestion) =>
                 suggestion.postalCode === fullFormatPostalCode &&
                 suggestion.locality === fullFormatLocality
         );

      // Original validation for numeric-only input
      const isNumericInput = /^\d+$/.test(value.trim());
      const showValidation = value.trim().length >= 4 && isNumericInput && !loading;
      const isValidPostalCode =
          showValidation &&
          suggestions.some((suggestion) => suggestion.postalCode === value.trim());

      const isInvalidPostalCode = showValidation && !isValidPostalCode;

      // Show empty state message only for numeric inputs (postal codes), not for locality names
      const shouldShowEmptyState =
          hasSearched &&
          value.trim().length >= 4 &&
          suggestions.length === 0 &&
          !loading &&
          isNumericInput;

      useEffect(() => {
          const query = value.trim();

          if (query.length < 2) {
              setSuggestions([]);
              setHasSearched(false);
              return;
          }

          // Skip search if we just selected a suggestion
          if (isSelectionRef.current) {
              isSelectionRef.current = false;
              return;
          }

          const abortController = new AbortController();

          async function fetchLocalities() {
              setLoading(true);

              try {
                  // Extract postal code if input is in format "XXXX Ort"
                  const postalCodeMatch = query.match(/^(\d+)\s/);
                  const searchQuery = postalCodeMatch ? postalCodeMatch[1] : query;

                  const url = /^\d+$/.test(searchQuery)
                      ? `https://openplzapi.org/ch/Localities?postalCode=${searchQuery}`
                      : `https://openplzapi.org/ch/Localities?locality=${encodeURIComponent(searchQuery)}`;

                  const response = await fetch(url, {
                      signal: abortController.signal,
                  });

                  if (!response.ok) {
                      throw new Error("Postal-Code-Suche fehlgeschlagen");
                  }

                  const data: PostalCodeLocality[] = await response.json();

                  const uniqueSuggestions = Array.from(
                      new Map(
                          data.map((item) => {
                              const label = `${item.postalCode} ${item.name}`;

                              return [
                                  label,
                                  {
                                      label,
                                      postalCode: item.postalCode,
                                      locality: item.name,
                                  },
                              ];
                          })
                      ).values()
                  );

                  setSuggestions(uniqueSuggestions.slice(0, 10));
                  setHasSearched(true);
              } catch (error) {
                  if (abortController.signal.aborted) return;

                  console.error(error);
                  setSuggestions([]);
                  setHasSearched(true);
              } finally {
                  if (!abortController.signal.aborted) {
                      setLoading(false);
                  }
              }
          }

          const timeoutId = window.setTimeout(fetchLocalities, 300);

          return () => {
              window.clearTimeout(timeoutId);
              abortController.abort();
          };
      }, [value]);

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

        setValue(nextValue);
        onValueChange?.(nextValue);
        onChange?.(event);
    }

     function handleSuggestionClick(suggestion: PostalCodeSuggestion) {
         isSelectionRef.current = true;
         setValue(suggestion.label);
         setSuggestions([]);
         setHasSearched(false);
         onValueChange?.(suggestion.label);
         onSuggestionSelect?.(suggestion);

         if (inputRef.current) {
             inputRef.current.value = suggestion.label;
             inputRef.current.dispatchEvent(new Event("input", { bubbles: true }));
         }
     }

    return (
        <div className={styles.inputBlockVertical}>
            <label
                htmlFor={inputId}
                className={[
                    styles.inputLabel,
                    variant === "glassy" ? styles.inputLabelGlassy : "",
                ]
                    .filter(Boolean)
                    .join(" ")}
            >
                {label}
            </label>

            <div className={styles.inputWrapper}>
                <input
                    id={inputId}
                    name={name}
                    ref={setInputElement}
                    type="text"
                    inputMode="search"
                    autoComplete="postal-code"
                    disabled={disabled}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    onBlur={onBlur}
                    className={[
                        styles.inputTextField,
                        variant === "glassy" ? styles.inputTextFieldGlassy : "",
                        isValidPostalCode || isValidFullFormat ? styles.inputValid : "",
                        isInvalidPostalCode || error ? styles.inputError : "",
                        className ?? "",
                    ]
                        .filter(Boolean)
                        .join(" ")}
                    aria-invalid={!!error || isInvalidPostalCode}
                    aria-describedby={error ? `${name}-error` : undefined}
                    {...rest}
                />

                {loading && <span className={styles.loading}>Lädt…</span>}

                {suggestions.length > 0 && (
                    <ul className={styles.suggestionList}>
                        {suggestions.map((suggestion) => (
                            <li key={suggestion.label}>
                                <button
                                    type="button"
                                    className={styles.suggestionItem}
                                    onMouseDown={(event) => event.preventDefault()}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                >
                  <span>
                    {suggestion.postalCode}
                  </span>
                                    <span className={styles.locality}>{suggestion.locality}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                 {hasSearched && value.trim().length >= 2 && suggestions.length === 0 && !loading && !isValidFullFormat && !isInvalidPostalCode && (
                     <div className={styles.emptyState}>
                         Keine Schweizer PLZ oder Ortschaft gefunden.
                     </div>
                 )}
             </div>

             {isValidPostalCode && (
                 <span className={styles.successMessage}>
           Gültige Schweizer Postleitzahl
         </span>
             )}

             {isValidFullFormat && (
                 <span className={styles.successMessage}>
           Gültige Schweizer Postleitzahl
         </span>
             )}

             {isInvalidPostalCode && (
                 <span className={styles.errorMessage}>
           Diese Schweizer Postleitzahl wurde nicht gefunden.
         </span>
             )}

            {error && (
                <span id={`${name}-error`} className={styles.errorMessage}>
          {error}
        </span>
            )}
        </div>
    );
}
