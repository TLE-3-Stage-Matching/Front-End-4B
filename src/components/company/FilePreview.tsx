import { useId } from "react";
import { ImagePlus } from "lucide-react";

/**
 * Renders a clickable preview for logo/banner uploads.
 * - When `isEditing` is true the preview acts as a label for a hidden file input.
 * - `alt` can be provided for descriptive alt text when an image is present.
 * - `error`/`errorId` are forwarded to the file input for aria-invalid/aria-describedby.
 */
export function FilePreview({
  label,
  src,
  isEditing,
  onFile,
  placeholder,
  alt,
  error,
  errorId,
}: {
  label: string;
  src?: string;
  isEditing?: boolean;
  onFile: (file?: File) => void;
  placeholder?: string;
  alt?: string;
  error?: string;
  errorId?: string;
}) {
  const id = useId();

  return (
    <div className="w-full">
      <div className="mb-2 text-sm font-medium">{label}</div>
      {isEditing ? (
        <>
          <label
            htmlFor={id}
            className="block cursor-pointer rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            tabIndex={0}
            role="button"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                const el = document.getElementById(id) as HTMLElement | null;
                if (el) el.click();
              }
            }}
          >
            {src ? (
              <img
                src={src}
                alt={alt ?? label}
                className="h-32 w-full rounded object-cover"
              />
            ) : (
              <div className="flex h-32 w-full items-center justify-center rounded bg-muted text-muted-foreground transition-colors duration-50 hover:bg-muted/80 hover:text-muted-foreground/90">
                <div className="flex flex-col items-center">
                  <ImagePlus
                    className="h-8 w-8 text-muted-foreground"
                    aria-hidden
                  />
                  <span className="mt-2 text-xs text-muted-foreground">
                    Foto uploaden
                  </span>
                </div>
              </div>
            )}
          </label>
          <input
            id={id}
            type="file"
            accept="image/*"
            onChange={(e) => onFile(e.target.files?.[0])}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : undefined}
            className="sr-only"
          />
        </>
      ) : src ? (
        <img
          src={src}
          alt={label}
          className="h-32 w-full rounded object-cover"
        />
      ) : (
        <div className="flex h-32 w-full items-center justify-center rounded bg-muted text-muted-foreground">
          {placeholder ?? `Geen ${label.toLowerCase()}`}
        </div>
      )}
    </div>
  );
}

export default FilePreview;
