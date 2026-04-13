import Link from "next/link";
import Image from "next/image";
import Badge from "./Badge";

interface CourseCardProps {
  slug: string;
  title: string;
  thumbnail: string;
  price: string;
  originalPrice?: string;
  badge?: string;
  description?: string;
}

export default function CourseCard({
  slug,
  title,
  thumbnail,
  price,
  originalPrice,
  badge,
  description,
}: CourseCardProps) {
  return (
    <Link href={`/course/${slug}`} className="group block">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group-hover:scale-[0.98] h-full flex flex-col">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {badge && (
            <div className="absolute top-3 right-3">
              <Badge variant="brand">{badge}</Badge>
            </div>
          )}
        </div>
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-base font-bold text-text-dark leading-snug line-clamp-2 group-hover:text-brand-dark transition-colors">
            {title}
          </h3>
          {description && (
            <p className="mt-2 text-sm text-text-muted line-clamp-2">
              {description}
            </p>
          )}
          <div className="mt-auto pt-4 flex items-center gap-2">
            <span className="text-lg font-bold text-text-dark">{price}</span>
            {originalPrice && (
              <span className="text-sm text-text-muted line-through">
                {originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
