import React, { useState, useEffect } from "react";
import ReactFlow, {
  Controls,
  Background,
  getBezierPath,
  Handle,
  Position,
} from "reactflow";

import "reactflow/dist/style.css";

import axios from "axios";
import RoadMapContentShow from "./RoadMapContentShow";

/* -------- EDGE -------- */

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

const RoadmapNode = ({ data }) => {

  return (
    <div
      className="p-4 rounded-xl shadow border bg-gray-900 text-white w-[260px] relative hover:border-cyan-400 transition"
    >

      <Handle
        type="target"
        position={Position.Left}
        style={{ opacity: 0 }}
      />

      <Handle
        type="source"
        position={Position.Right}
        style={{ opacity: 0 }}
      />

      <h3 className="font-bold text-lg text-blue-400">
        {data.title}
      </h3>

      <p className="text-xs mt-1">
        ⏱ {data.duration}
      </p>

      <p className="text-sm mt-2">
        {data.description}
      </p>

      <div className="mt-3">

        <p className="text-cyan-400 text-sm font-semibold">
          Topics
        </p>

        <div className="flex flex-wrap gap-2 mt-2">

          {data.topics?.map((topic, index) => (

            <div
              key={index}
              onClick={() => data.onTopicClick(topic)}
              className="bg-[#0f172a] px-3 py-2 rounded-lg text-xs border border-zinc-700 hover:border-cyan-400 cursor-pointer"
            >
              {topic.name}
            </div>

          ))}

        </div>

      </div>

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

const RoadmapPage = ({
  onSelect,
  handleDelete,
}) => {

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  // 🔥 MODAL STATES

  const [openModal, setOpenModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const [selectedTopic, setSelectedTopic] = useState("");

  const [topicContent, setTopicContent] = useState("");

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
            x: index * 350,
            y: 120,
          },

          data: {

            title: phase.title,

            duration: phase.duration,

            description: phase.description,

            topics: phase.topics || [],

            // 🔥 TOPIC CLICK

            onTopicClick: async (topic) => {

              try {

                setOpenModal(true);

                setLoading(true);

                setSelectedTopic(topic.name);

                const res = await axios.post(
                  "http://localhost:5000/ai/roadmap/generate-topic-content",
                  {
                    roadmapId: roadmapData._id,
                    topicId: topic._id,
                  }
                );

                setTopicContent(res.data.content);

                setLoading(false);

              } catch (error) {

                console.log(error);

                setLoading(false);

              }

            }

          },

        });

        // 🔥 CONNECT EDGES

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

  }, [onSelect]);

  return (

    <div className="h-screen bg-black text-white p-6">

      {/* HEADER */}

      <div className="flex items-center justify-between mb-2">

        <h1 className="text-2xl font-bold mb-4">

          AI Roadmap for

          <span className="text-blue-500">
            {" "} {onSelect?.skill}
          </span>

          {" "}({onSelect?.level})

        </h1>

        <button
          onClick={() => handleDelete(onSelect._id)}
          className="bg-red-500 px-4 py-2 rounded mb-4"
        >
          Delete roadmap
        </button>

      </div>

      {/* 🔥 POPUP */}

      <RoadMapContentShow
        open={openModal}
        onClose={() => setOpenModal(false)}
        topicName={selectedTopic}
        content={topicContent}
        loading={loading}
      />

      {/* FLOW */}

      <div className="h-[80vh] border border-zinc-800 rounded-xl overflow-hidden">

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