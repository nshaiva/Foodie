/** The Explore map opened on a country (and optionally one of its regions). */
export function countryPath(countryId: string, regionSlug?: string | null): string {
  const params = new URLSearchParams({ c: countryId });
  if (regionSlug) params.set('r', regionSlug);
  return `/?${params}`;
}
