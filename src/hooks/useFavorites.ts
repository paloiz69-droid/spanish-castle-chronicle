import { useEffect, useSyncExternalStore } from "react";

const KEY = "kdronazo:favoritos:v1";
const EVENT = "kdronazo:favoritos:change";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((s) => typeof s === "string") : [];
  } catch {
    return [];
  }
}

function write(slugs: string[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(slugs));
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

export function useFavorites() {
  const slugs = useSyncExternalStore(subscribe, read, () => []);
  return slugs;
}

export function useIsFavorite(slug: string) {
  const favs = useFavorites();
  return favs.includes(slug);
}

export function toggleFavorite(slug: string): boolean {
  const current = read();
  const exists = current.includes(slug);
  const next = exists ? current.filter((s) => s !== slug) : [...current, slug];
  write(next);
  return !exists;
}

/** Hook helper to ensure client-only render of favorites count to avoid hydration mismatch. */
export function useMounted() {
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useEffect(() => {}, []);
  return isMounted;
}