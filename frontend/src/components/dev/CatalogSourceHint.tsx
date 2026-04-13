import type { CatalogDataSource } from "@/lib/catalog";

function labelForSource(source: CatalogDataSource): string {
  switch (source) {
    case "api":
      return "Express API";
    case "unavailable":
      return "API unreachable or not found";
    default:
      return source;
  }
}

/**
 * Set `NEXT_PUBLIC_SHOW_CATALOG_SOURCE=1` in `.env.local` to see where catalog data came from.
 */
export function CatalogSourceHint({
  label,
  source,
}: {
  label: string;
  source: CatalogDataSource;
}) {
  if (process.env.NEXT_PUBLIC_SHOW_CATALOG_SOURCE !== "1") return null;

  return (
    <p
      className="text-[11px] font-mono text-text-muted border border-dashed border-border/80 rounded px-2 py-1 bg-light-bg/80 inline-block"
      title="Catalog data source (dev only)"
    >
      <span className="text-text-muted/70">{label}:</span>{" "}
      <span
        className={
          source === "api"
            ? "text-green-700 dark:text-green-400"
            : "text-amber-700 dark:text-amber-400"
        }
      >
        {labelForSource(source)}
      </span>
    </p>
  );
}
