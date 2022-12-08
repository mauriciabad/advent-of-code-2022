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

  const bestScore: number =
    Math.max(...(
      treeGrid.map(line =>
        line.map(tree => scientificScore(tree, treeGrid))
      ).flat()
    ))

  return String(bestScore)
}

function scientificScore(tree: Tree, treeGrid: Tree[][]): number {
  const treesOnLeftHeights = treeGrid[tree.y].slice(0, tree.x,).map(tree => tree.height).reverse()
  const treesOnRightHeights = treeGrid[tree.y].slice(tree.x + 1, undefined).map(tree => tree.height)
  const treesOnTopHeights = treeGrid.map(line => line[tree.x]).slice(0, tree.y).map(tree => tree.height).reverse()
  const treesOnBottomHeights = treeGrid.map(line => line[tree.x]).slice(tree.y + 1, undefined).map(tree => tree.height)

  // console.log('Tree:', tree)
  // console.log('  ⬅️', visibleTrees(tree.height, treesOnLeftHeights), treesOnLeftHeights);
  // console.log('  ➡️', visibleTrees(tree.height, treesOnRightHeights), treesOnRightHeights);
  // console.log('  ⬆️', visibleTrees(tree.height, treesOnTopHeights), treesOnTopHeights);
  // console.log('  ⬇️', visibleTrees(tree.height, treesOnBottomHeights), treesOnBottomHeights);
  // console.log();

  return (
    visibleTrees(tree.height, treesOnLeftHeights) *
    visibleTrees(tree.height, treesOnRightHeights) *
    visibleTrees(tree.height, treesOnTopHeights) *
    visibleTrees(tree.height, treesOnBottomHeights)
  )
}

function visibleTrees(heigh: number, otherTreesHeight: number[]): number {
  const index = otherTreesHeight.findIndex((otherTreeHeight) => otherTreeHeight >= heigh)

  return index === -1 ? otherTreesHeight.length : index + 1
}
