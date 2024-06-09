import type { Launch } from "../../api/launches";

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

export function fuzzySearch(items: Launch[], pattern: string): Launch[] {
  return items.filter((item) =>
    item.name ? isSubsequence(item.name, pattern) : false
  );
}
