import { useEffect, useSyncExternalStore } from "react";

const KEY = "kdronazo:favoritos:v1";
const EVENT = "kdronazo:favoritos:change";

const EMPTY: string[] = [];
let cache: string[] = EMPTY;
let cacheLoaded = false;

function load(): string[] {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((s) => typeof s === "string") : EMPTY;
  } catch {
    return EMPTY;
  }
}

function read(): string[] {
  if (!cacheLoaded) {
    cache = load();
    cacheLoaded = true;
  }
  return cache;
}

function refresh() {
  cache = load();
  cacheLoaded = true;
}

function readServer(): string[] {
  return EMPTY;
}

function write(slugs: string[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(slugs));
  cache = slugs;
  cacheLoaded = true;
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const handler = () => {
    refresh();
    cb();
  };
  window.addEventListener(EVENT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}

export function useFavorites() {
  const slugs = useSyncExternalStore(subscribe, read, readServer);
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