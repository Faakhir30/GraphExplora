export function dijkstra(grid, startNode, finishNode) {
  let frontier = [startNode];
  let explored = [];
  console.log(grid[9])
  // Set the distance of the startNode to 0
  startNode.distance = 0;
  
  while (true) {
    if (frontier.length === 0) return explored;
    
    // Sort the frontier nodes by distance
    frontier.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
    
    // Get the node with the smallest distance (closestNode)
    let closestNode = frontier.shift();
    
    // If we encounter a wall, we skip it.
    if (closestNode.isWall) continue;
    
    // If the closestNode is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode.distance === Infinity) return explored;
    
    // Mark the closestNode as visited
    closestNode.isVisited = true;
    explored.push(closestNode);
    
    if (closestNode === finishNode) return explored;
    
    updateUnvisitedNeighbors(closestNode, grid, frontier, explored);
  }
}

function updateUnvisitedNeighbors(node, grid, frontier, explored) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    const distance = node.distance + 1;
    
    // If the new distance is smaller than the current distance of the neighbor,
    // update the neighbor's distance and set its previousNode to the current node.
    // if (distance < neighbor.distance) {
      neighbor.distance = distance;
      neighbor.previousNode = node;
      
      // Add the neighbor to the frontier if it's not already in it
      if (!frontier.includes(neighbor) && !explored.includes(neighbor)) {
        frontier.push(neighbor);
      // }
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
  console.log(neighbors.filter(neighbor => !neighbor.isVisited))
  return neighbors.filter(neighbor => !neighbor.isVisited);
}