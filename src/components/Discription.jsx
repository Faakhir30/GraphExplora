import React, { useState, useRef, useEffect } from "react";
import "./dropdown.css";

const discriptions = {
  "": [
    "GreenNode: starting node",
    "RedNode: Ending Node",
    "DiscreteDraw: After selecting draw or erase button draw using single touch on any node.",
    "ContinousDraw: Double click to start continuous drawing from any node. Double click again to end drawing.",
  ],
  bfs: [
    "BFS: Best First Search",
    "Characteristics: Breath-first Search is unweighted and guarantees the shortest path!",
  ],
  dijkstra: [
    "Dijkstra's Algorithm",
    "Characteristics: Dijkstra's Algorithm finds the shortest path in a weighted graph.",
  ],
  dfs: [
    "DFS: Depth-first Search",
    "Characteristics: Depth-first Search is an unweighted algorithm that explores as far as possible along each branch before backtracking.",
  ],
  gbfs: [
    "GBFS: Greedy Best-First Search",
    "Characteristics: Greedy Best-First Search is an informed search algorithm that uses a heuristic to guide its exploration.",
  ],
  aStar: [
    "A*: A-star Algorithm",
    "Characteristics: A* Algorithm is an informed search algorithm that combines the advantages of Dijkstra's Algorithm and Best-First Search.",
  ],
};
function Modal({ algo, closeModal }) {
  const [descHeight, setDescHeight] = useState(0);
  const descRef = useRef(null);

  useEffect(() => {
    if (descRef.current)
      setDescHeight(descRef.current.clientHeight);
  }, []);


  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div
          ref={descRef}
          className="dropdown-menu desc"
          style={{
            transform: `translateY(-${descHeight}px)`,
          }}
        >
          {discriptions[algo].map((line, index) => {
            const [heading, ...remaining] = line.split(" ");

            return (
              <div key={index} style={{ display: "flex" }}>
                <div className="heading">{heading}</div>
                <div>{remaining.join(" ")}</div>
              </div>
            );
          })}
        <button className="modal-close" onClick={closeModal}>
          Close
        </button>
        </div>
      </div>
    </div>
  );
}

function Discription({ algo }) {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const dscbtnTxt=algo||"Discription"
  return (
    <div className="dropdown">
      {isOpen && <Modal algo={algo} closeModal={closeModal} />}
      <button className="dropdown-toggle desc-btn" onClick={openModal}>
        {dscbtnTxt}
      </button>
    </div>
  );
}

export default Discription;
