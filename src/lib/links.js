// External links open in a new tab, safely (CLAUDE.md §11).
export function linkProps(href) {
  return /^https?:/.test(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {}
}
