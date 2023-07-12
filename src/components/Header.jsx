import React, { useState } from "react";
import DropdownforHeader from "./Dropdown";

const Header = ({ visualizeAlgo, grid, setGrid }) => {
  const [Algo, setAlgo] = useState("");
  const [speed, setSpeed] = useState(100);
  function clearMaze() {
    let newGrid = [...grid];
    for (let Row of newGrid)
      for (let node of Row) {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node " +
          (node.isStart
            ? "node-start"
            : node.isFinish
            ? "node-finish"
            : node.isWall
            ? "node-wall"
            : "");

        let updatedNode = {
          ...node,
          isVisited: false,
          previousNode: null,
          distance: Infinity,
        };
        // Update the node in the grid with the updatedNode
        node = updatedNode;
      }
    setGrid(newGrid);
  }
  function setAlgoritm(name) {
    for (let algoname of ["dfs", "bfs", "gbfs", "dijkstra", "aStar"])
      if (algoname === name)
        document.getElementById(name).className = "active-btn";
      else document.getElementById(algoname).className = "";
    let initializer = document.getElementById("initializer");
    initializer.innerText = "Visualize";
    initializer.className = "active-btn";
    setAlgo(name);
  }

  const InitializeAlgo = async () => {
    let initializer = document.getElementById("initializer");
    if (Algo === "") return;
    clearMaze();
    initializer.style.opacity = 0.5;
    initializer.setAttribute("disabled", "disabled");
    document.getElementById("clear").setAttribute("disabled", "disabled");
    await visualizeAlgo(Algo, speed); // wait for the visualization to complete
    initializer.removeAttribute("disabled");
    document.getElementById("clear").removeAttribute("disabled");
    initializer.style.opacity = 1;
  };
  return (
    <div className="header">
      <div className="logo">
        <img src="logo.png" alt="logo-img" />
        <div> <div>Graph</div>Explora</div>
      </div>
      <div className="header-items">
        <div>
          <DropdownforHeader setAlgo={setAlgoritm} />
        </div>
        <div>
          <label htmlFor="speedRange">Speed:{"   "}</label>
          <input
            id="speedRange"
            className="form-range p-1"
            type="range"
            min="10"
            max="370"
            defaultValue="100"
            step="90"
            onChange={(e) => setSpeed(e.target.value)}
          />{" "}
        </div>
        <button id="clear" onClick={clearMaze}>
          Clear Maze
        </button>
        <button className="red-btn" id="initializer" onClick={InitializeAlgo}>
          Select Algo!
        </button>
      </div>
    </div>
  );
};

export default Header;
