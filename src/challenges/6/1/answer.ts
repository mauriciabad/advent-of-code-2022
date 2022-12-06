export function answer(input: string): string {
  for (let i = 3; i < input.length; i++) {
    const letter1 = input[i - 0];
    const letter2 = input[i - 1];
    const letter3 = input[i - 2];
    const letter4 = input[i - 3];

    const set = new Set<string>([letter1,
      letter2,
      letter3,
      letter4])
    if (set.size === 4) return String(i + 1)
  }

  return String('')
}

// ------------------- helper functions -----------------
