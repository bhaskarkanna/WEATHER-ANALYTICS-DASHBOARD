export function writeCache(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}
export function readCache(key) {
  try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
}
