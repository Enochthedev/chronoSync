export function extractNameFromMessage(message: string): string | null {
    const patterns = [
      /my name is ([\w\s]+)/i,
      /i'?m ([\w\s]+)/i,
      /i am ([\w\s]+)/i,
    ];
  
    for (const pattern of patterns) {
      const match = message.match(pattern);
      if (match && match[1]) {
        return match[1].trim();
      }
    }
  
    return null;
  }