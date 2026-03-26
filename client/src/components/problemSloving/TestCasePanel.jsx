import React, { useState } from "react";

const TestcasePanel = () => {
  const [tab, setTab] = useState("testcases");

  return (
    <div className="h-full w-full  shadow flex flex-col">

      {/* Tabs */}
      <div className="flex border-b">
        <button onClick={() => setTab("testcases")} className="p-2">
          Testcases
        </button>
        <button onClick={() => setTab("output")} className="p-2">
          Output
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 overflow-y-auto">
        {tab === "testcases" && (
          <div>
            <p>Input: 2 7 11 15</p>
            <p>Target: 9</p>
          </div>
        )}

        {tab === "output" && (
          <div>
            <p>Output will be shown here...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestcasePanel;