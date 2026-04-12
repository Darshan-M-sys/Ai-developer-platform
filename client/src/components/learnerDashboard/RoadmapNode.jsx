import { Handle, Position } from "reactflow";

const RoadmapNode = ({ data }) => {
  return (
    <div className="p-4 rounded-xl shadow border bg-gray-900 text-white w-[240px] relative">

      {/* invisible handles */}
      <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />

      <h3 className="font-bold text-lg text-blue-400">
        {data.title}
      </h3>

      <p className="text-xs mt-1">⏱ {data.duration}</p>
      <p className="text-sm mt-2">{data.description}</p>

      <p className="text-sm mt-2">📚 {data.topics}</p>
      <p className="text-xs mt-2">🚀 {data.projects}</p>
    </div>
  );
};

export default RoadmapNode;