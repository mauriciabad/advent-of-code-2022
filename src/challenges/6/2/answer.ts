export function answer(input: string): string {
  const letters = input.split('')
  for (let i = 3; i < letters.length; i++) {
    const set = new Set<string>(letters.slice(i - 14, i))
    if (set.size === 14) return String(i)
  }

  return String('')
}

// ------------------- helper functions -----------------
