# GraphExplora

GraphExplora is a ReactJS website that allows users to draw mazes and visualize the behavior of different search algorithms for graphs, including Depth-First Search (DFS), Breadth-First Search (BFS), Greedy Best-First Search (GBFS), Dijkstra's algorithm, and A* algorithm.
Site live at https://graph-explora.vercel.app/
## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Supported Algorithms](#supported-algorithms)
- [Contributing](#contributing)

## Introduction

GraphExplora is a web application designed to provide an interactive environment for exploring graph search algorithms. It enables users to create custom mazes and observe how various search algorithms navigate through these mazes to find the shortest path from a source node to a target node.

## Features

- Interactive maze drawing: Users can easily draw custom mazes by clicking on grid cells to create walls and pathways.
- Multiple search algorithms: GraphExplora supports several search algorithms, including DFS, BFS, GBFS, Dijkstra's algorithm, and A*, allowing users to compare their behaviors in the same maze.
- Visualizations: The web application provides real-time visualizations of the chosen search algorithm in action, making it easier to comprehend the traversal process.
- Start and Target node selection: Users can select the starting and target nodes by simply clicking on the desired cells in the maze grid.
- Step-by-step mode: Users can watch the algorithm progress step by step or run it instantly to view the final path.
- Responsive design: GraphExplora is designed to work seamlessly on both desktop and mobile devices.

## Installation

Provide instructions on how to install the project locally. Include the necessary dependencies and steps to run the application on a development server.

```bash
git clone https://github.com/Faakhir30/GraphExplora.git
cd GraphExplora
npm install
npm start
```

## Usage

Explain how to use the application and its various features. Provide examples of how to draw mazes, select algorithms, and visualize their behavior.

1. **Drawing a Maze:** Click on the grid cells to create walls, creating a maze structure. You can also clear walls if needed.

2. **Selecting Algorithms:** Choose one of the available search algorithms (DFS, BFS, GBFS, Dijkstra's, or A*) from the dropdown menu.

3. **Selecting Start and Target Nodes:** Click on any cell in the maze to set the starting node (marked as "S") and another cell for the target node (marked as "T").

4. **Visualization:** Click on the "Visualize" button to see the selected algorithm in action. Observe the process of traversal, and the final path will be highlighted.

5. **Step-by-Step Mode:** If desired, slow down the speed range to watch the algorithm progress through each iteration slowly.

## Supported Algorithms

GraphExplora currently supports the following graph search algorithms:

1. Depth-First Search (DFS)
2. Breadth-First Search (BFS)
3. Greedy Best-First Search (GBFS)
4. Dijkstra's algorithm
5. A* algorithm

## Contributing

If you'd like to contribute to GraphExplora, feel free to open issues or submit pull requests. Your contributions are highly appreciated.

---
