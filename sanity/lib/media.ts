export function safeSanityImageUrl(value: string | null | undefined) {
  if (!value) return null;

  try {
    const url = new URL(value);
    return url.protocol === "https:" &&
      url.hostname === "cdn.sanity.io" &&
      url.pathname.startsWith("/images/")
      ? url.toString()
      : null;
  } catch {
    return null;
  }
}
