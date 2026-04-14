function SectionTitleSkeleton() {
  return (
    <div className="text-center mb-12 space-y-4">
      <div className="h-4 w-24 bg-border rounded mx-auto" />
      <div className="h-10 max-w-md bg-border rounded-lg mx-auto" />
      <div className="h-4 max-w-2xl bg-border/80 rounded mx-auto" />
      <div className="h-4 max-w-xl bg-border/80 rounded mx-auto" />
    </div>
  );
}

function PlanCardsSkeleton() {
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

export default function PricingPageSkeleton() {
  return (
    <div className="animate-pulse">
      <section className="bg-dark py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="h-4 w-32 bg-white/20 rounded" />
            <div className="h-12 w-full max-w-lg bg-white/20 rounded-lg" />
            <div className="h-4 w-full bg-white/10 rounded" />
            <div className="h-4 w-5/6 bg-white/10 rounded" />
          </div>
        </div>
      </section>
      <section className="bg-body-bg py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitleSkeleton />
          <div className="flex justify-center">
            <PlanCardsSkeleton />
          </div>
        </div>
      </section>
      <section className="bg-light-bg py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-10 w-64 bg-border rounded-lg mx-auto mb-12" />
          <div className="space-y-6">
            {[1, 2].map((i) => (
              <div key={i} className="h-48 bg-white border border-border rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
