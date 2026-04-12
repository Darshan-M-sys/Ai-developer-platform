import React, { useState } from "react";
import axios from "axios";
import FormField from "../components/FormField"; // adjust path

const GenerateRoadmap = ({ isOpen, onClose, onSuccess,setOnSelect }) => {
  const [formData, setFormData] = useState({
    skill: "",
    level: "",
    goal: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/ai/roadmap/generate-roadmap",
        formData,
        { withCredentials: true }
      );

      // send data to parent (optional)
      if (onSuccess) {
        onSuccess(res.data.roadmap);
      }
      if(res.data?.roadmap){
        setOnSelect(res.data.roadmap);
      }
      onClose(); // close popup
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ❌ if not open → don't render
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

      {/* MODAL */}
      <div className="bg-white text-black w-[400px] rounded-xl p-6 shadow-xl relative">

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-white"
        >
          ✖
        </button>

        <h2 className="text-xl font-bold mb-4">
          🚀 Generate Roadmap
        </h2>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <FormField
            label="Skill"
            name="skill"
            required={true}
            value={formData.skill}
            onChange={(e) => handleChange("skill", e.target.value)}
          />

          <FormField
            label="Level"
            name="level"
            required={true}
           select={true}
              options={[
                { value: "Beginner", label: "Beginner" },
                { value: "Intermediate", label: "Intermediate" },
                { value: "Advanced", label: "Advanced" },
              ]}
            value={formData.level}
            onChange={(e) => handleChange("level", e.target.value)}
          />

          <FormField
            label="Goal"
            name="goal"
             equired={true}
         
            value={formData.goal}
            onChange={(e) => handleChange("goal", e.target.value)}
          />

          {/* BUTTON */}
          <button
            type="submit"
         
            disabled={loading}
            className="w-full bg-pink-500 py-2 rounded hover:bg-pink-600"
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GenerateRoadmap;