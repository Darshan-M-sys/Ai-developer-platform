import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import axios from "axios";

const SnippetSidebar = ({
  setCode,
  setLanguage,
  setSnippetId,
  render,
}) => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [snippets, setSnippets] = useState([]);

  const [languageExtension] = useState({
    javascript: "js",
    python: "py",
    java: "java",
    cpp: "cpp",
    c: "c",
    html: "html",
    css: "css",
  });

  // FILTER SNIPPETS
  const filteredSnippets = snippets.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  // GET ALL SNIPPETS
  const handleGetAllSnippets = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/snippets/all",
        {
          withCredentials: true,
        }
      );

      setSnippets(res.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // LOAD ALL SNIPPETS
  useEffect(() => {
    handleGetAllSnippets();
  }, [render]);

  // GET SINGLE SNIPPET
  const handleGetSingleSnippets = async (id) => {
    try {
      if (!id) return;

      const res = await axios.get(
        `http://localhost:5000/snippets/single/${id}`,
        {
          withCredentials: true,
        }
      );

      setCode(res.data?.data?.code || "");
      setLanguage(res.data?.data?.language || "");
    } catch (error) {
      console.log(error);
    }
  };

  // NEW SNIPPET
  const handleNewSnippets = () => {
    setCode("// Select language");
    setLanguage("");
    setSnippetId(null);
  };

  return (
    <>
      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-20 left-[30px] z-[60] bg-indigo-600 text-white p-2 rounded-lg"
      >
        <Menu size={20} />
      </button>

      {/* SIDEBAR */}
      <div
        className={`fixed md:static top-0 left-0 z-[50] h-full w-[260px] bg-white border-r shadow-sm p-4 transition-transform duration-300
        ${
          open
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* TITLE */}
        <h2 className="text-xl font-bold mb-4">
          Saved Snippets
        </h2>

        {/* NEW BUTTON */}
        <button
          onClick={handleNewSnippets}
          className="w-full border px-3 py-2 rounded-lg mb-4 bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          New
        </button>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search snippets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg mb-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* SNIPPET LIST */}
        <div className="flex flex-col gap-2 overflow-y-auto h-[75vh]">
          {filteredSnippets.length > 0 ? (
            filteredSnippets.map((snippet) => (
              <button
                key={snippet._id}
                onClick={() => {
                  handleGetSingleSnippets(snippet._id);
                  setSnippetId(snippet._id);

                  // CLOSE SIDEBAR IN MOBILE
                  setOpen(false);
                }}
                className="text-left px-3 py-2 rounded-lg hover:bg-indigo-50 transition flex items-center justify-between"
              >
                <span className="w-[150px] overflow-x-auto whitespace-nowrap">
                  {snippet.title}
                </span>

                <span className="text-gray-500 text-sm">
                  .
                  {snippet.language &&
                    (languageExtension[snippet.language] ||
                      snippet.language)}
                </span>
              </button>
            ))
          ) : (
            <p className="text-gray-400 text-sm text-center mt-5">
              No snippets found
            </p>
          )}
        </div>
      </div>

      {/* MOBILE OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 md:hidden z-[40]"
        />
      )}
    </>
  );
};

export default SnippetSidebar;