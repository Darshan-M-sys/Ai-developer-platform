import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const AiResponseLayout = ({ aiResponse }) => {
  const [typedText, setTypedText] = useState("");

  /* ==============================
     TYPING EFFECT
  ============================== */
  useEffect(() => {
    if (!aiResponse) return;

    let i = 0;
    setTypedText("");

    const typing = setInterval(() => {
      setTypedText((prev) => prev + aiResponse[i]);
      i++;

      if (i >= aiResponse.length) {
        clearInterval(typing);
      }
    }, 5); // speed

    return () => clearInterval(typing);
  }, [aiResponse]);

  return (
    <div className="w-full border-t bg-[#020617] text-white flex flex-col">

      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-700">
        <p className="text-sm font-semibold text-indigo-400">
          AI Code Assistant
        </p>
      </div>

      {/* ================= RESPONSE AREA ================= */}
      <div className="p-6 min-h-[250px] max-h-[400px] overflow-y-auto">

        {!typedText ? (
          <p className="text-gray-400 text-sm">
            Click Explain / Debug / Optimize to get AI response...
          </p>
        ) : (
          <div className="prose prose-invert max-w-none">

            <ReactMarkdown
              components={{

                /* ===== CODE BLOCK ===== */
                code({ inline, children }) {
                  if (inline) {
                    return (
                      <code className="bg-gray-800 text-indigo-400 px-1 py-[2px] rounded text-sm">
                        {children}
                      </code>
                    );
                  }
                  
                  return (
                    <pre className="bg-black rounded-xl p-4 overflow-x-auto border border-gray-700">
                      <code className="text-sm text-green-400">
                        {children}
                      </code>
                    </pre>
                  );
                },

                /* ===== PARAGRAPH ===== */
                p({ children }) {
                  return (
                    <p className="text-gray-200 leading-relaxed mb-4">
                      {children}
                    </p>
                  );
                },

                /* ===== HEADINGS ===== */
                h1({ children }) {
                  return (
                    <h1 className="text-xl font-bold text-white mb-3">
                      {children}
                    </h1>
                  );
                },

                h2({ children }) {
                  return (
                    <h2 className="text-lg font-semibold text-indigo-400 mb-3">
                      {children}
                    </h2>
                  );
                },

                /* ===== LIST ===== */
                li({ children }) {
                  return (
                    <li className="text-gray-300 mb-2">
                      {children}
                    </li>
                  );
                },

              }}
            >
              {typedText}
            </ReactMarkdown>

          </div>
        )}

      </div>
    </div>
  );
};

export default AiResponseLayout;