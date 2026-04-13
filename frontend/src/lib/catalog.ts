/**
 * Catalog loaders: data comes only from the Express API (see `server-api.ts` for base URL).
 */
import { cache } from "react";
import { fetchAPI } from "@/lib/server-api";
import type {
  CourseDetail,
  CourseListItem,
  PlanItem,
  ProgramDetail,
  ProgramListItem,
} from "@/lib/types";

/** Set `NEXT_PUBLIC_SHOW_CATALOG_SOURCE=1` to surface this in the UI (`CatalogSourceHint`). */
export type CatalogDataSource = "api" | "unavailable";

export type CatalogResult<T> = { data: T; source: CatalogDataSource };

async function fetchList<T>(path: string): Promise<CatalogResult<T[]>> {
  const raw = await fetchAPI<T[]>(path);
  if (raw !== null) return { data: raw, source: "api" };
  return { data: [], source: "unavailable" };
}

export async function getCourseList(): Promise<
  CatalogResult<CourseListItem[]>
> {
  return fetchList<CourseListItem>("/courses");
}

export async function getPlans(): Promise<CatalogResult<PlanItem[]>> {
  return fetchList<PlanItem>("/plans");
}

export async function getProgramList(): Promise<
  CatalogResult<ProgramListItem[]>
> {
  return fetchList<ProgramListItem>("/programs");
}

async function loadCourseDetail(
  slug: string
): Promise<CatalogResult<CourseDetail | null>> {
  const data = await fetchAPI<CourseDetail>(`/courses/${slug}`);
  if (data) return { data, source: "api" };
  return { data: null, source: "unavailable" };
}

/** Dedupes `generateMetadata` + page both requesting the same slug in one render. */
export const getCourseDetail = cache(loadCourseDetail);

async function loadProgramDetail(
  slug: string
): Promise<CatalogResult<ProgramDetail | null>> {
  const data = await fetchAPI<ProgramDetail>(`/programs/${slug}`);
  if (data) return { data, source: "api" };
  return { data: null, source: "unavailable" };
}

export const getProgramDetail = cache(loadProgramDetail);
