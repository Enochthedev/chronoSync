export function tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/gi, '')
      .split(/\s+/)
      .filter(Boolean);
  }
  
  export function normalize(text: string): string {
    return text.trim().toLowerCase();
  }