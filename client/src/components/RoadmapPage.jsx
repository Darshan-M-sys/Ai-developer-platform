import React, { useState } from "react";
import ReactFlow, {
  Controls,
  Background,
  getBezierPath,
  Handle,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import axios from "axios";
import { useEffect } from "react";

/* -------- EDGE (ONLY ANIMATION) -------- */
const AnimatedEdge = (props) => {
  const [path] = getBezierPath(props);

  return (
    <path
      d={path}
      stroke="#00ffff"
      strokeWidth={2}
      fill="none"
      className="edge-animation"
    />
  );
};

/* -------- NODE -------- */
const RoadmapNode = ({ data ,onSelect}) => {
  return (
    <div className="p-4 rounded-xl shadow border bg-gray-900 text-white w-[240px] relative">

      {/* 🔥 invisible handles (required for edges) */}
      <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />

      <h3 className="font-bold text-lg text-blue-400">
        {data.title}
      </h3>

      <p className="text-xs mt-1">⏱ {data.duration}</p>

      <p className="text-sm mt-2">{data.description}</p>

      <p className="text-sm mt-2">
        📚 {data.topics}
      </p>

      <p className="text-xs mt-2">
        🚀 {data.projects}
      </p>
    </div>
  );
};

/* -------- TYPES -------- */
const nodeTypes = {
  roadmapNode: RoadmapNode,
};

const edgeTypes = {
  animatedEdge: AnimatedEdge,
};

/* -------- MAIN -------- */
const RoadmapPage = ( { onSelect, handleDelete } ) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

useEffect(() => {
    try {
      const roadmapData = onSelect;

      if (!roadmapData?.phases) return;

      const newNodes = [];
      const newEdges = [];

      roadmapData.phases.forEach((phase, index) => {
        newNodes.push({
          id: `${index}`,
          type: "roadmapNode",
          position: {
            x: index * 300,
            y: 120,
          },
          data: {
            title: phase.title,
            duration: phase.duration,
            description: phase.description,
            topics: phase.topics?.map(t => t.name).join(", "),
            projects: phase.projects?.map(p => p.name).join(", "),
          },
        });

        if (index > 0) {
          newEdges.push({
            id: `e${index - 1}-${index}`,
            source: `${index - 1}`,
            target: `${index}`,
            type: "animatedEdge",
          });
        }
      });

      setNodes(newNodes);
      setEdges(newEdges);

    } catch (err) {
      console.error(err);
    }
  }
  ,[ onSelect]);


  return (
    <div className="h-screen bg-black text-white p-6">
      <div className="flex items-center justify-between mb-2">
      <h1 className="text-2xl font-bold mb-4">
        AI Roadmap for<span className="text-blue-500"> {onSelect?.skill} </span> ({onSelect?.level})
      </h1>

      <button
        onClick={() => handleDelete(onSelect._id)}
        className="bg-red-500 px-4 py-2 rounded mb-4"
      >
    Delete roadmap
      </button>
</div>
      <div className="h-[80vh] border">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
};

export default RoadmapPage;