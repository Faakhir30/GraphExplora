export function aStar(grid, startNode, finishNode) {
  let frontier = [startNode];
  startNode.distance = 0;
  let explored = [];
  while (true) {
    if (frontier.length === 0) return explored;
    frontier.sort((nodeA, nodeB) => {
      const distanceA =
        Math.abs(finishNode.col - nodeA.col) +
        Math.abs(finishNode.row - nodeA.row);
      const distanceB =
        Math.abs(finishNode.col - nodeB.col) +
        Math.abs(finishNode.row - nodeB.row);

      const sortValueA = distanceA + nodeA.distance;
      const sortValueB = distanceB + nodeB.distance;
      //tie-breaking for priority queue
      if (sortValueA === sortValueB) return nodeA.distance-nodeB.distance;

      return sortValueA - sortValueB;
    });
    let node = frontier.shift();
    explored.push(node);
    for (const neighborNode of getUnvisitedNeighbors(node, grid)) {
      if (neighborNode === finishNode) {
        neighborNode.previousNode = node;
        return explored;
      }
      if (
        !explored.includes(neighborNode) &&
        !frontier.includes(neighborNode) &&
        !neighborNode.isWall
      ) {
        neighborNode.distance = node.distance + 1;
        neighborNode.previousNode = node;
        frontier.push(neighborNode);
      }
    }
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}
