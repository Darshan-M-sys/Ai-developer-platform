import React, { useRef } from "react";
import ReactMarkdown from "react-markdown";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const AiLessonNotesGenerator = () => {
  const notesRef = useRef();

  const notes = `
# 📚 AI Generated Notes

## What is Python?

Python is a **high-level programming language** that is easy to learn and powerful.

It is used in:

- Web Development
- Artificial Intelligence
- Data Science
- Automation
- Game Development

---

## Key Points

- Python syntax is simple
- Python is beginner-friendly
- Python supports OOP
- Python has a huge community

---

## Example

\`\`\`python
print("Hello Python")
\`\`\`

---

## More Notes

Python is widely used in real-world applications such as:

- AI tools
- Chatbots
- Web apps
- Automation scripts
- Data analysis projects
- Machine learning systems
- Cloud applications
- APIs

---

## Summary

Python is one of the best programming languages for beginners and professionals.
`;

  const downloadPDF = async () => {
    const element = notesRef.current;

    const canvas = await html2canvas(element, {
      scale: 2,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save("AI_Lesson_Notes.pdf");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm space-y-5">

      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h2 className="text-xl font-bold">📚 AI Lesson Notes</h2>

        <button
          onClick={downloadPDF}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Export as PDF
        </button>
      </div>

      {/* Notes Content */}
      <div ref={notesRef} className="prose max-w-none bg-gray-50 p-5 rounded-lg">
        <ReactMarkdown>{notes}</ReactMarkdown>
      </div>
    </div>
  );
};

export default AiLessonNotesGenerator;