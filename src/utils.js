// Import Third-party Dependencies
import { getManifestEmoji } from "@nodesecure/flags/web";

// Import Internal Dependencies
import * as CONSTANTS from "./constants.js";

// CONSTANTS
const kFlagsEmojis = Object.fromEntries(getManifestEmoji());

export async function getJSON(path, customHeaders = Object.create(null)) {
  const headers = {
    Accept: "application/json"
  };

  const raw = await fetch(path, {
    method: "GET",
    headers: Object.assign({}, headers, customHeaders)
  });

  return raw.json();
}

/**
 * @param {!number} id
 * @param {!string[]} flags
 * @param {string} [theme=LIGHT] theme
 * @returns {string}
 */
export function getNodeColor(id, flags, theme = "LIGHT") {
  // id 0 is the root package (so by default he is highlighted as selected).
  if (id === 0) {
    return CONSTANTS.COLORS[theme].SELECTED;
  }
  else if (flags.includes("hasWarnings") || flags.includes("hasMinifiedCode")) {
    return CONSTANTS.COLORS[theme].WARN;
  }

  return CONSTANTS.COLORS[theme].DEFAULT;
}

export function getFlagsEmojisInlined(flags) {
  return [...flags]
    .map((title) => kFlagsEmojis[title] ?? null)
    .filter((value) => value !== null)
    .reduce((acc, cur) => `${acc} ${cur}`, "");
}
