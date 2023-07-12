import React, { useState } from "react";
import Node from "./Node/Node";
import { dijkstra } from "../algorithms/dijkstra";
import { bfs } from "../algorithms/bfs";
import { gbfs } from "../algorithms/greedyBfs";
import { dfs } from "../algorithms/dfs";
import { aStar } from "../algorithms/a-star";
import { getNodesInPathOrder } from "../algorithms/bactrace";
import "./PathfindingVisualizer.css";
import Header from "../Header";

const PathfindingVisualizer = ({ width, height }) => {
  const START_NODE_ROW = Math.floor((height * 0.9) / 50 - 2);
  const START_NODE_COL = 1;
  const FINISH_NODE_ROW = Math.floor((height * 0.9) / 50 - 2);
  const FINISH_NODE_COL = Math.floor(width / 25 - 3);
  const createNodeParams = (col, row) => {
    return {
      col,
      row,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    };
  };

  const [grid, setGrid] = useState(() => {
    // Initializing grid
    const grid = [];
    for (let row = 0; row < (height * 0.9) / 25 - 1; row++) {
      const currentRow = [];
      for (let col = 0; col < width / 25 - 1; col++) {
        currentRow.push(createNodeParams(col, row));
      }
      grid.push(currentRow);
    }
    return grid;
  });

  const startNode = grid[START_NODE_ROW][START_NODE_COL];
  const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];

  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [activeImage, setActiveImage] = useState(null); // State to track the active image (paint or erase)

  const handleMouseDown = (row, col) => {
    setMouseIsPressed(true);
    const node = grid[row][col];
    if (activeImage === "paint") {
      if (node.isWall === false)
        setGrid(getNewGridWithWallToggled(grid, row, col));
    } else if (activeImage === "erase") {
      if (node.isWall) setGrid(getNewGridWithWallToggled(grid, row, col));
    }
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;
    if (activeImage === "paint") {
      const newGrid = getNewGridWithWallToggled(grid, row, col);
      setGrid(newGrid);
    } else if (activeImage === "erase") {
      const node = grid[row][col];
      if (node.isWall) {
        const newGrid = getNewGridWithWallToggled(grid, row, col);
        setGrid(newGrid);
      }
    }
  };

  const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = [...grid];
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  const toggleActiveImage = (image) => {
    setActiveImage(image);
  };  

  const visualizeAlgo = (name, speed) => {
    const algo = { dijkstra, bfs, dfs, gbfs, aStar };
    const visitedNodesInOrder = algo[name](grid, startNode, finishNode);
    const rightPath = getNodesInPathOrder(finishNode);
    return new Promise((resolve) => {
      let i = 0;

      const animateNode = () => {
        if (i === visitedNodesInOrder.length) {
          // animating correct path
          for (let j = 0; j < rightPath.length; j++) {
            const node = rightPath[j];
            setTimeout(() => {
              document.getElementById(
                `node-${node.row}-${node.col}`
              ).className = "node node-correct-path";
              if (node.isStart)
                document.getElementById(
                  `node-${node.row}-${node.col}`
                ).className = "node node-start";
              if (node.isFinish)
                document.getElementById(
                  `node-${node.row}-${node.col}`
                ).className = "node node-finish";

              if (j === rightPath.length - 1) {
                resolve(); // resolve the promise when the animation is complete
              }
            }, 50 * j);
          }
        } else {
          const node = visitedNodesInOrder[i];
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-visited";

          i++;

          setTimeout(animateNode, 380-speed); // call the next animation step
        }
      };

      animateNode(); // start the animation
    });
  };
  return (
    <>
      <Header visualizeAlgo={visualizeAlgo} grid={grid} setGrid={setGrid} />
      <div className="grid">
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const { row, col, isFinish, isStart, isWall } = node;
                return (
                  <Node
                    key={nodeIdx}
                    col={col}
                    isFinish={isFinish}
                    isStart={isStart}
                    isWall={isWall}
                    mouseIsPressed={mouseIsPressed}
                    onMouseDown={() => handleMouseDown(row, col)}
                    onMouseEnter={() => handleMouseEnter(row, col)}
                    onMouseUp={() => setMouseIsPressed(false)}
                    row={row}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="image-overlay">
        <div
          className="image-container"
          onClick={() => toggleActiveImage("paint")}
        >
          <img
            src="paint.jpg"
            alt="draw"
            className={`overlay-image ${
              activeImage === "paint" ? "active" : ""
            }`}
          />
          <span className="image-label">Draw</span>
        </div>
        <div
          className="image-container"
          onClick={() => toggleActiveImage("erase")}
        >
          <img
            src="rubber.jpg"
            alt="erase"
            className={`overlay-image ${
              activeImage === "erase" ? "active" : ""
            }`}
          />
          <span className="image-label">Erase</span>
        </div>
      </div>
    </>
  );
};

export default PathfindingVisualizer;
