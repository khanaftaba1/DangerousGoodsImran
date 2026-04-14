import { PlanCardsSkeleton, SectionTitleSkeleton } from "@/components/ui/catalog-skeletons";

export default function SubscriptionSectionSkeleton() {
  return (
    <section className="bg-light-bg py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <SectionTitleSkeleton />
        </div>
        <div className="flex justify-center">
          <PlanCardsSkeleton />
        </div>
      </div>
    </section>
  );
}
