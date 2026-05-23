// RoadMapContentShow.jsx

import React, { useState } from "react";

import ReactMarkdown from "react-markdown";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

import { Copy, Check } from "lucide-react";

const RoadMapContentShow = ({
  open,
  onClose,
  topicName,
  content,
  loading
}) => {

  const [copied, setCopied] = useState("");

  const copyCode = async (code) => {
    await navigator.clipboard.writeText(code);

    setCopied(code);

    setTimeout(() => {
      setCopied("");
    }, 2000);
  };

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

              <ReactMarkdown
                components={{
                  code({ inline, className, children, ...props }) {

                    const match = /language-(\w+)/.exec(className || "");

                    const codeString = String(children).replace(/\n$/, "");

                    // CODE BLOCK
                    if (!inline) {
                      return (
                        <div className="relative my-5 rounded-2xl overflow-hidden border border-white/10">

                          {/* TOP BAR */}
                          <div className="flex items-center justify-between bg-zinc-900 px-4 py-2 border-b border-white/10">

                            <span className="text-xs text-zinc-400 uppercase">
                              {match?.[1] || "code"}
                            </span>

                            <button
                              onClick={() => copyCode(codeString)}
                              className="flex items-center gap-1 text-xs bg-zinc-800 hover:bg-zinc-700 px-3 py-1 rounded-lg transition"
                            >

                              {copied === codeString ? (
                                <>
                                  <Check size={14} />
                                  Copied
                                </>
                              ) : (
                                <>
                                  <Copy size={14} />
                                  Copy
                                </>
                              )}

                            </button>

                          </div>

                          {/* CODE */}
                          <SyntaxHighlighter
                            language={match?.[1]}
                            style={vscDarkPlus}
                            PreTag="div"
                            customStyle={{
                              margin: 0,
                              padding: "20px",
                              background: "#111827",
                              fontSize: "14px",
                              borderRadius: "0px",
                            }}
                            {...props}
                          >
                            {codeString}
                          </SyntaxHighlighter>

                        </div>
                      );
                    }

                    // INLINE CODE
                    return (
                      <code className="bg-zinc-800 text-pink-400 px-1.5 py-1 rounded-md">
                        {children}
                      </code>
                    );
                  },
                }}
              >
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