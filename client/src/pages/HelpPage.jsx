import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

const HelpPage = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [search, setSearch] = useState("");

  const faqs = [
    {
      q: "How to start coding on DevForge?",
      a: `Go to the Code Playground, write your code, and click Run. You can also ask AI for help.`
    },
    {
      q: "How does AI help me?",
      a: "AI can explain your code, debug errors, and suggest optimizations instantly."
    },
    {
      q: "How to enroll in a course?",
      a: "Go to Courses → Select course → Click Enroll → Fill details → Done."
    },
    {
      q: "How do I get my certificate?",
      a: "Complete the course and click on 'Generate Certificate' to download it."
    },
    {
      q: "Is DevForge free?",
      a: "Yes, basic features are free. Premium features will be added later."
    }
  ];

  const filteredFaqs = faqs.filter((item) =>
    item.q.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white px-6 py-12">

      {/* 🔥 HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">Help Center </h1>
        <p className="text-gray-400 mt-3">
          Find answers, learn features, and get support
        </p>
      </div>

      {/* 🔍 SEARCH */}
      <div className="max-w-xl mx-auto mb-10 relative">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search help topics..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none"
        />
      </div>

      {/* 🚀 GETTING STARTED */}
      <section className="max-w-5xl mx-auto mb-12">
        <h2 className="text-2xl font-semibold mb-6">Getting Started</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-xl">
            <h3 className="font-semibold text-lg">1. Open Playground</h3>
            <p className="text-gray-400 mt-2">
              Navigate to the Code Playground to start writing code.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl">
            <h3 className="font-semibold text-lg">2. Write Code</h3>
            <p className="text-gray-400 mt-2">
              Use the editor to write HTML, CSS, or JavaScript.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl">
            <h3 className="font-semibold text-lg">3. Use AI</h3>
            <p className="text-gray-400 mt-2">
              Ask AI to explain, debug, or optimize your code.
            </p>
          </div>
        </div>
      </section>

      {/* 💡 FEATURES */}
      <section className="max-w-5xl mx-auto mb-12">
        <h2 className="text-2xl font-semibold mb-6"> Features Guide</h2>

        <div className="space-y-4">
          <div className="bg-gray-800 p-5 rounded-lg">
            <h4 className="font-semibold">🧠 AI Assistant</h4>
            <p className="text-gray-400 mt-2">
              Chat with AI to understand concepts, fix bugs, and improve code.
            </p>
          </div>

          <div className="bg-gray-800 p-5 rounded-lg">
            <h4 className="font-semibold">💻 Code Playground</h4>
            <p className="text-gray-400 mt-2">
              Run your code instantly and see output in real-time.
            </p>
          </div>

          <div className="bg-gray-800 p-5 rounded-lg">
            <h4 className="font-semibold">⚡ AI Optimization</h4>
            <p className="text-gray-400 mt-2">
              Get suggestions to improve performance and readability.
            </p>
          </div>
        </div>
      </section>

      {/* 🎓 COURSE + CERTIFICATE GUIDE */}
      <section className="max-w-5xl mx-auto mb-12">
        <h2 className="text-2xl font-semibold mb-6">
          🎓 Course Registration & Certificate Guide
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Registration */}
          <div className="bg-gray-800 p-6 rounded-xl">
            <h3 className="font-semibold text-lg mb-3">
              📝 How to Register
            </h3>

            <ul className="space-y-2 text-gray-300">
              <li>👉 Go to Courses page</li>
              <li>👉 Select a course</li>
              <li>👉 Click "Enroll Now"</li>
              <li>👉 Fill your details</li>
              <li>👉 Submit registration</li>
            </ul>
          </div>

          {/* Success */}
          <div className="bg-gray-800 p-6 rounded-xl">
            <h3 className="font-semibold text-lg mb-3">
              🎉 After Registration
            </h3>

            <p className="text-gray-300">
              After enrolling, you will see:
            </p>

            <div className="bg-green-600 p-3 rounded mt-3 text-center font-semibold">
              ✅ Registration Successful! Welcome 🚀
            </div>
          </div>
        </div>

        {/* Certificate */}
        <div className="bg-gray-800 p-6 rounded-xl mt-6">
          <h3 className="font-semibold text-lg mb-3">
            🧾 Certificate Generation
          </h3>

          <ul className="space-y-2 text-gray-300">
            <li>👉 Complete all lessons</li>
            <li>👉 Finish final test</li>
            <li>👉 Click "Generate Certificate"</li>
            <li>👉 Download as PDF</li>
          </ul>

          <div className="mt-4 bg-gray-900 p-4 rounded text-green-400 font-mono text-sm">
{`Certificate of Completion

This certifies that YOU
have successfully completed
AI Developer Platform Course`}
          </div>
        </div>
      </section>

      {/* ❓ FAQ */}
      <section className="max-w-5xl mx-auto mb-12">
        <h2 className="text-2xl font-semibold mb-6">❓ FAQs</h2>

        <div className="space-y-4">
          {filteredFaqs.map((item, index) => (
            <div key={index} className="bg-gray-800 rounded-lg">

              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full flex justify-between items-center p-4"
              >
                <span>{item.q}</span>
                <ChevronDown />
              </button>

              {openIndex === index && (
                <p className="px-4 pb-4 text-gray-400">
                  {item.a}
                </p>
              )}

            </div>
          ))}
        </div>
      </section>

      {/* 📞 SUPPORT */}
      <section className="text-center bg-gradient-to-r from-blue-600 to-purple-600 p-10 rounded-xl max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold">
          Need more help? 🤝
        </h2>

        <p className="mt-3 text-gray-200">
          Contact our support team anytime.
        </p>

        <div className="flex justify-center gap-4 mt-6">
          <button className="bg-white text-black px-5 py-2 rounded-lg font-semibold">
            Contact Support
          </button>

          <button className="border px-5 py-2 rounded-lg">
            View Docs
          </button>
        </div>
      </section>

    </div>
  );
};

export default HelpPage;