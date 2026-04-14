import { PlanCardsSkeleton, SectionTitleSkeleton } from "@/components/ui/catalog-skeletons";

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
