import React, { useState } from "react";
import "./dropdown.css"
function DropdownforHeader({ setAlgo }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Algo");
  const handleItemClick = (algo) => {
    setSelectedItem(algo);
    setIsOpen(false);
    setAlgo(algo);
  };

  return (
    <div className="dropdown">
      <button className="dropdown-toggle" onClick={()=>setIsOpen(!isOpen)}>
        {selectedItem}
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <div id="dijkstra" className="dropdown-item" onClick={() => handleItemClick("dijkstra")}>
            Dijkstra
          </div>
          <div id="bfs" className="dropdown-item" onClick={() => handleItemClick("bfs")}>
            BFS
          </div>
          <div id="dfs" className="dropdown-item" onClick={() => handleItemClick("dfs")}>
            DFS
          </div>
          <div id="gbfs" className="dropdown-item" onClick={() => handleItemClick("gbfs")}>
            Greedy BFS
          </div>
          <div id="aStar" className="dropdown-item" onClick={() => handleItemClick("aStar")}>
            A *
          </div>
        </div>
      )}
    </div>
  );
}

export default DropdownforHeader;
