import type { Launch } from "../../api/launches";

/**
 * Function to check if search term is a subsequence of text
 * @param text The text to search within
 * @param search The search term
 * @returns boolean indicating if search is a subsequence of text
 */
function isSubsequence(text: string, search: string): boolean {
  let index = 0;

  for (let i = 0; i < text.length; i++) {
    if (text[i].toLowerCase() === search[index].toLowerCase()) {
      index++;
      if (index === search.length) return true;
    }
  }

  return false;
}

/**
 * Function to perform fuzzy search on an array of strings
 * @param items The array of strings to search within
 * @param pattern The search term
 * @returns Array of matching items
 */
export function fuzzySearch(items: Launch[], pattern: string): Launch[] {
  return items.filter((item) =>
    item.name ? isSubsequence(item.name, pattern) : false
  );
}
