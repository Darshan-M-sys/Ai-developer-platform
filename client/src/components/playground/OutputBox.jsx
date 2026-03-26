import React from "react";

const OutputBox = ({ output }) => {
  return (
    <div className="w-90%  p-5 mx-9  bg-black text-green-400  font-mono h-[250px] overflow-y-auto border-t">
      
      {/* TITLE */}
      <div className="text-gray-300 mb-3 font-semibold">
        OUTPUT
      </div>

      {/* OUTPUT TEXT */}
      <pre className="whitespace-pre-wrap">
        { "> "+output || "Run your code to see the output..."}
      </pre>

    </div>
  );
};

export default OutputBox;