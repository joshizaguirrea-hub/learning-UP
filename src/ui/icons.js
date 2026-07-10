/**
 * ui/icons.js — Iconos SVG reutilizables (datos puros de presentacion).
 *
 * Cada icono es un string SVG que hereda el color via currentColor. Se usan con
 * el(..., { html: ICONS.home }). Sin emojis (regla del proyecto).
 */
const wrap = (paths, size = 24) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ` +
  `stroke-linecap="round" stroke-linejoin="round" width="${size}" height="${size}">${paths}</svg>`;

export const ICONS = {
  home: wrap('<path d="M3 10.5L12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9 21v-6h6v6"/>'),
  map: wrap('<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/>'),
  teachers: wrap('<circle cx="12" cy="8" r="3.5"/><path d="M5 20a7 7 0 0114 0"/>'),
  calendar: wrap('<rect x="3" y="4.5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/>'),
  chat: wrap('<path d="M21 12a8 8 0 01-11.9 7L3 21l1.9-6.1A8 8 0 1121 12z"/>'),
  settings: wrap('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.6 1.6 0 00-1.8-.3 1.6 1.6 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.6 1.6 0 00-1-1.5 1.6 1.6 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.6 1.6 0 00.3-1.8 1.6 1.6 0 00-1.5-1H3a2 2 0 110-4h.1a1.6 1.6 0 001.5-1 1.6 1.6 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.6 1.6 0 001.8.3H9a1.6 1.6 0 001-1.5V3a2 2 0 114 0v.1a1.6 1.6 0 001 1.5 1.6 1.6 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.6 1.6 0 00-.3 1.8V9a1.6 1.6 0 001.5 1H21a2 2 0 110 4h-.1a1.6 1.6 0 00-1.5 1z"/>'),
  globe: wrap('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18"/>'),
  lock: wrap('<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/>'),
  check: wrap('<path d="M20 6L9 17l-5-5"/>'),
  star: wrap('<path d="M12 3l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 18.8 6.1 21l1.2-6.5L2.5 9.9 9.1 9z"/>'),
  flame: wrap('<path d="M12 3c1 3 4 4 4 8a4 4 0 11-8 0c0-1.2.4-2 1-2.8C8.6 9.4 9 8 9 7c1.2.6 2 1.6 2 2.8C12 8 12 5 12 3z"/>'),
  play: wrap('<path d="M7 5l12 7-12 7z"/>'),
  sound: wrap('<path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 8a5 5 0 010 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'),
};
