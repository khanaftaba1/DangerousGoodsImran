/** Shared loading placeholders for catalog-style sections (plans, etc.). */

export function SectionTitleSkeleton() {
  return (
    <div className="text-center mb-12 space-y-4">
      <div className="h-4 w-24 bg-border rounded mx-auto" />
      <div className="h-10 max-w-md bg-border rounded-lg mx-auto" />
      <div className="h-4 max-w-2xl bg-border/80 rounded mx-auto" />
      <div className="h-4 max-w-xl bg-border/80 rounded mx-auto" />
    </div>
  );
}

export function PlanCardsSkeleton() {
  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="rounded-xl p-8 border border-border bg-white shadow-sm min-h-[280px] space-y-4"
        >
          <div className="h-8 w-40 bg-border rounded" />
          <div className="h-4 w-full bg-border/70 rounded" />
          <div className="h-10 w-28 bg-border rounded mt-4" />
          <div className="space-y-2 pt-4">
            {[1, 2, 3, 4].map((j) => (
              <div key={j} className="h-4 w-full bg-border/60 rounded" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
