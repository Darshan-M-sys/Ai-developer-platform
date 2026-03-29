import React from "react";
import ReactMarkdown from "react-markdown";

const AiLessonExplain = () => {

  const aiExplanation = `
# 🤖 AI Explanation of This Lesson

## What is a Variable?

A variable is a **container used to store data** in programming.

Think of it like a box where you can store a value.

Example in Python:

\`\`\`python
name = "Darshan"
age = 21
\`\`\`

Here:
- \`name\` stores text
- \`age\` stores a number

---

## Why are variables important?

Variables help us:

- Store user input
- Store data from database
- Perform calculations
- Build real applications

---

## Real-life Example

Imagine you are building a **student website**.

You will store:

- Student name
- Email
- Course name
- Marks

All these values are stored using **variables**.

---

## Simple Rule to Remember

A variable = name + value

Example:

\`\`\`python
score = 95
\`\`\`

Here:
- \`score\` is the variable name
- \`95\` is the value
`;

  return (
    <div className="bg-white p-2 md:p-6 rounded-xl shadow-sm space-y-4">

      <h2 className="text-xl font-bold">AI Lesson Explanation</h2>

      <div className="prose max-w-none">
        <ReactMarkdown>{aiExplanation}</ReactMarkdown>
      </div>

    </div>
  );
};

export default AiLessonExplain;