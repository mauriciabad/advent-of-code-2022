type Tree = {
  x: number,
  y: number,
  height: number,
}

export function answer(input: string): string {
  const treeGrid: Tree[][] = input
    .split('\n')
    .map((line, lineIndex) => line
      .split('')
      .map((char, charIndex) => ({
        x: charIndex,
        y: lineIndex,
        height: Number(char)
      }))
    )

  // console.log(treeGrid.map(line => line.map(tree => tree.height)));

  function isVisible(tree: Tree): boolean {
    const treesOnLeftHeights = treeGrid[tree.y].slice(0, tree.x,).map(tree => tree.height)
    const treesOnRightHeights = treeGrid[tree.y].slice(tree.x + 1, undefined).map(tree => tree.height).reverse()
    const treesOnTopHeights = treeGrid.map(line => line[tree.x]).slice(0, tree.y).map(tree => tree.height)
    const treesOnBottomHeights = treeGrid.map(line => line[tree.x]).slice(tree.y + 1, undefined).map(tree => tree.height).reverse()

    return (
      (!treesOnLeftHeights.length || Math.max(...treesOnLeftHeights) < tree.height) ||
      (!treesOnRightHeights.length || Math.max(...treesOnRightHeights) < tree.height) ||
      (!treesOnTopHeights.length || Math.max(...treesOnTopHeights) < tree.height) ||
      (!treesOnBottomHeights.length || Math.max(...treesOnBottomHeights) < tree.height)
    )
  }

  const totalVisibleTrees: number = treeGrid
    .map(line => line.map(isVisible))
    .flat()
    .filter(Boolean)
    .length

  return String(totalVisibleTrees)
}

// ------------------- helper functions -----------------
