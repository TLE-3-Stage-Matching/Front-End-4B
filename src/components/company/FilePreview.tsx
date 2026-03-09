import { useId } from "react";
import { ImagePlus } from "lucide-react";

export function FilePreview({
  label,
  src,
  isEditing,
  onFile,
  placeholder,
}: {
  label: string;
  src?: string;
  isEditing?: boolean;
  onFile: (file?: File) => void;
  placeholder?: string;
}) {
  const id = useId();

  return (
    <div className="w-full">
      <div className="mb-2 text-sm font-medium">{label}</div>
      {isEditing ? (
        <>
          <label htmlFor={id} className="block cursor-pointer">
            {src ? (
              <img
                src={src}
                alt={label}
                className="h-32 w-full rounded object-cover"
              />
            ) : (
              <div className="flex h-32 w-full items-center justify-center rounded bg-muted text-muted-foreground transition-colors duration-50 hover:bg-muted/80 hover:text-muted-foreground/90">
                <ImagePlus
                  className="h-8 w-8 text-muted-foreground"
                  aria-hidden
                />
              </div>
            )}
          </label>
          <input
            id={id}
            type="file"
            accept="image/*"
            onChange={(e) => onFile(e.target.files?.[0])}
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
