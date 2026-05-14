import {
    useId,
    useMemo,
    useState,
    useEffect,
    type ChangeEvent,
    type DragEvent,
    type InputHTMLAttributes,
} from "react";
import styles from "./Upload.module.css";

export type UploadProps = {
    label: string;
    name: string;
    file?: File | null;
    error?: string;
    variant?: "glassy" | "default";
    maxSizeBytes?: number;
    onFileChange?: (file: File | null) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value">;

/**
 * A reusable Upload component that can be used across the application.
 *
 * Usage with react-hook-form:
 *
 * <Upload
 *   label="Avatar hochladen"
 *   error={errors.avatar?.message}
 *   {...register("avatar")}
 * />
 *
 * Usage with local file preview:
 *
 * const [avatarFile, setAvatarFile] = useState<File | null>(null);
 *
 * <Upload
 *   name="avatar"
 *   label="Avatar hochladen"
 *   file={avatarFile}
 *   onFileChange={setAvatarFile}
 *   error={errors.avatar?.message}
 *   accept="image/*"
 *   maxSizeBytes={5 * 1024 * 1024}
 * />
 */
export default function Upload({
                                   label,
                                   name,
                                   id,
                                   file,
                                   error,
                                   variant = "default",
                                   accept = "image/*",
                                   maxSizeBytes = 5 * 1024 * 1024,
                                   disabled,
                                   className,
                                   onChange,
                                   onFileChange,
                                   ...rest
                               }: UploadProps) {
    const generatedId = useId();
    const inputId = id ?? `${name}-${generatedId}`;

    const [isDragging, setIsDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(file ?? null);

    const isControlled = file !== undefined;
    const currentFile = isControlled ? file : selectedFile;

    const previewUrl = useMemo(() => {
        if (!currentFile) return null;
        if (!currentFile.type.startsWith("image/")) return null;

        return URL.createObjectURL(currentFile);
    }, [currentFile]);

    useEffect(() => {
        if (!isControlled) return;

        setSelectedFile(file ?? null);
    }, [file, isControlled]);

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    function validateFile(nextFile: File | null): File | null {
        if (!nextFile) return null;

        const acceptsImages = accept === "image/*" || accept.startsWith("image/");

        if (acceptsImages && !nextFile.type.startsWith("image/")) {
            return null;
        }

        if (maxSizeBytes && nextFile.size > maxSizeBytes) {
            return null;
        }

        return nextFile;
    }

    function handleFileChange(nextFile: File | null) {
        const validFile = validateFile(nextFile);

        if (!isControlled) {
            setSelectedFile(validFile);
        }

        onFileChange?.(validFile);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const nextFile = event.target.files?.[0] ?? null;

        handleFileChange(nextFile);
        onChange?.(event);
    }

    function handleDragOver(event: DragEvent<HTMLDivElement>) {
        event.preventDefault();
        event.stopPropagation();

        if (!disabled) {
            setIsDragging(true);
        }
    }

    function handleDragLeave(event: DragEvent<HTMLDivElement>) {
        event.preventDefault();
        event.stopPropagation();

        if (event.currentTarget.contains(event.relatedTarget as Node)) return;

        setIsDragging(false);
    }

    function handleDrop(event: DragEvent<HTMLDivElement>) {
        event.preventDefault();
        event.stopPropagation();

        setIsDragging(false);

        if (disabled) return;

        const nextFile = event.dataTransfer.files?.[0] ?? null;
        handleFileChange(nextFile);
    }

    function handleRemoveFile() {
        if (!isControlled) {
            setSelectedFile(null);
        }

        onFileChange?.(null);
    }

    const maxSizeMb = Math.round(maxSizeBytes / (1024 * 1024));

    return (
        <div
            className={[
                styles.wrapper,
                className ?? "",
            ]
                .filter(Boolean)
                .join(" ")}
        >
            <label
                className={[
                    styles.label,
                    variant === "glassy" ? styles.labelGlassy : "",
                ]
                    .filter(Boolean)
                    .join(" ")}
                htmlFor={inputId}
            >
                {label}
            </label>

            <div
                className={[
                    styles.dropzone,
                    variant === "glassy" ? styles.dropzoneGlassy : "",
                    isDragging ? styles.dragOver : "",
                    error ? styles.errorState : "",
                    disabled ? styles.disabled : "",
                ]
                    .filter(Boolean)
                    .join(" ")}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <input
                    id={inputId}
                    name={name}
                    className={styles.hiddenInput}
                    type="file"
                    accept={accept}
                    disabled={disabled}
                    onChange={handleInputChange}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${name}-error` : undefined}
                    {...rest}
                />

                <label htmlFor={inputId} className={styles.dropzoneContent}>
                    {!currentFile ? (
                        <span className={styles.placeholder}>
              <span className={styles.big}>Datei hier reinziehen</span>
              <span className={styles.small}>…oder klicken, um auszuwählen</span>
              <span className={styles.hint}>
                Erlaubt: {accept} · max. {maxSizeMb} MB
              </span>
            </span>
                    ) : (
                        <span className={styles.selected}>
              {previewUrl && (
                  <img
                      className={styles.preview}
                      src={previewUrl}
                      alt={`Vorschau von ${currentFile.name}`}
                  />
              )}

                            <span className={styles.fileMeta}>
                <span className={styles.fileName}>{currentFile.name}</span>
                <span className={styles.fileSize}>
                  {(currentFile.size / 1024).toFixed(0)} KB ·{" "}
                    {currentFile.type || "unknown"}
                </span>
              </span>
            </span>
                    )}
                </label>

                {currentFile && (
                    <button
                        type="button"
                        className={styles.remove}
                        onClick={handleRemoveFile}
                        disabled={disabled}
                    >
                        Entfernen
                    </button>
                )}
            </div>

            {error && (
                <span id={`${name}-error`} className={styles.errorMessage}>
          {error}
        </span>
            )}
        </div>
    );
}
