"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { CourseCard } from "@/components/ui";
import { FEATURED_COURSES } from "@/lib/data";

export default function CourseSearch() {
  const [query, setQuery] = useState("");

  const filtered = FEATURED_COURSES.filter(
    (course) =>
      course.title.toLowerCase().includes(query.toLowerCase()) ||
      course.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <div className="relative max-w-md mb-8">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted/50"
        />
        <input
          type="text"
          placeholder="Search courses..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-[10px] border border-border bg-white pl-11 pr-4 py-3 text-[15px] text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-brand/40"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-text-muted py-8">
          No courses found matching &quot;{query}&quot;
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course) => (
            <CourseCard key={course.slug} {...course} />
          ))}
        </div>
      )}
    </>
  );
}
