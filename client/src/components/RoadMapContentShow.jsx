// RoadMapContentShow.jsx

import React from "react";

import ReactMarkdown from "react-markdown";

const RoadMapContentShow = ({
  open,
  onClose,
  topicName,
  content,
  loading
}) => {

  if (!open) return null;

  return (

    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-5">

      <div className="w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#091224] border border-zinc-800 rounded-3xl shadow-2xl">

        {/* HEADER */}

        <div className="sticky top-0 z-10 bg-[#091224] border-b border-zinc-800 px-8 py-5 flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold text-cyan-400">
              {topicName}
            </h1>

            <p className="text-zinc-400 mt-1">
              AI Generated Learning Content
            </p>

          </div>

          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl text-white"
          >
            ✕
          </button>

        </div>

        {/* BODY */}

        <div className="p-8">

          {loading ? (

            <div className="flex flex-col items-center justify-center py-20">

              <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />

              <p className="text-zinc-400 mt-6 text-lg">
                Generating AI content...
              </p>

            </div>

          ) : (

            <div className="prose prose-invert max-w-none">

              <ReactMarkdown>
                {content}
              </ReactMarkdown>

            </div>

          )}

        </div>

      </div>

    </div>

  );
};

export default RoadMapContentShow;