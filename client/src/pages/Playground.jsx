import React, { useState } from "react";
import PlaygroundNav from "../components/playground/PlaygrooundNav";
import CodeEditor from "../components/playground/CodeEditor";
import Header from "../components/home/Header";
import { Settings, Settings2 } from "lucide-react";
import SnippetSidebar from "../components/playground/SinppetSidebar";
import AIActions from "../components/playground/AiActions";
import SaveSnippets from "../components/playground/SaveSnippets";
import ActionDisplay from "../components/ActionDisplay";
import { useEffect } from "react";
import axios from 'axios'
import OutputBox from "../components/playground/OutputBox";
import AiResponseLayout from "../components/playground/AiResponseLayout";

const Playground = () => {
  const [action,setAction]=useState({
    show:false,
    message:"",
    type:""
  })
 const [aiResponses, setAiResponses] = useState("");
  const [snippetId,setSnippetId]=useState("")
  const [language, setLanguage] = useState("");
  const [aiReply,setAiReply]=useState("")
  const [theme, setTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(14);
  const [openSaveSnippets,setOpenSaveSnippets]=useState(false)
  const [code, setCode] = useState("//select language");
  const [showEditorSettings,setShowEditorSettings]=useState(false);
  const [render,setRender]=useState(false);
  const [output,setOutput]=useState("")
const boilerplates = {
  javascript: `// JavaScript Boilerplate
function main() {
  console.log("Hello, World!");
}

main();`,

  typescript: `// TypeScript Boilerplate
function main(): void {
  console.log("Hello, World!");
}

main();`,

  python: `# Python Boilerplate
def main():
    print("Hello, World!")

if __name__ == "__main__":
    main()`,

  java: `// Java Boilerplate
public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
  }
}`,

  c: `// C Boilerplate
#include <stdio.h>

int main() {
  printf("Hello, World!\\n");
  return 0;
}`,

  cpp: `// C++ Boilerplate
#include <iostream>
using namespace std;

int main() {
  cout << "Hello, World!" << endl;
  return 0;
}`,

  csharp: `// C# Boilerplate
using System;

class Program {
  static void Main() {
    Console.WriteLine("Hello, World!");
  }
}`,

  go: `// Go Boilerplate
package main

import "fmt"

func main() {
  fmt.Println("Hello, World!")
}`,

  php: `<?php
// PHP Boilerplate
echo "Hello, World!";
?>`,

  rust: `// Rust Boilerplate
fn main() {
  println!("Hello, World!");
}`,

  swift: `// Swift Boilerplate
print("Hello, World!")`,

  kotlin: `// Kotlin Boilerplate
fun main() {
  println("Hello, World!")
}`,

  html: `<!-- HTML Boilerplate -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Hello World</title>
</head>
<body>
  <h1>Hello, World!</h1>
</body>
</html>`,

 

  json: `{
  "message": "Hello, World!"
}`,

  sql: `-- SQL Boilerplate
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100)
);`,

  markdown: `# Hello World

This is a Markdown boilerplate.
`,
};

 useEffect(()=>{
  if(language && code==="//select language"){
    setCode(boilerplates[language])
    console.log(boilerplates[language])
  }
 },[language,code])

 const handleCodeRun=async()=>{
try {
  const res= await axios.post("http://localhost:5000/code/run",{code,language});
  setOutput(res.data?.output);
    const a=  document.createElement("a");
     a.href="#output";
     a.click();

} catch (error) {
 console.log(error.message)  
}
 }

 const handleDeleteSnippets=async()=>{
  try {
     if(!window.confirm("Are yor sure to delete this code Snippet"))return ;
      const  res= await axios.delete(`http://localhost:5000/snippets/delete/${snippetId}`,{withCredentials:true});
      if(res.data?.success){
        setCode("//select language")
        setLanguage("")
        setRender(!render)
        setSnippetId(null)
      }
  } catch (error) {
     console.log(error)
  }
 }
  return (
    <>
     {action.show && (
  <ActionDisplay
    message={action.message}
    type={action.type}
    onClose={() => setAction((prev) => ({ ...prev, show: false }))}
  />
)}
    {openSaveSnippets && 
  <SaveSnippets onClose={setOpenSaveSnippets} setRender={setRender} render={render} setAction={setAction} language={language} code={code}/>
    }
    <Header/>
    <div className="mt-[70px]">
      <PlaygroundNav
      setOpenSaveSnippets={setOpenSaveSnippets}
        language={language}
        setLanguage={setLanguage} 
        snippetId={snippetId}
        code={code}
        setAction={setAction}
      />
      
</div>


      {/* SETTINGS PANEL */}
      
        <div className="fixed top-[120px] ">
          <SnippetSidebar  render={render} setCode={setCode} setLanguage={setLanguage} setSnippetId={setSnippetId}/> 
        </div>
        
      <div className="pt-16 md:ml-[260px]  px-6 relative   items-center bg-gray-100 border-b py-3">

         
         <div className="p-2 bg-white shadow rounded-xl">
        {showEditorSettings &&(
       <div className="flex bg-white flex-col z-[40] gap-10 p-4 shadow right-[60px] rounded top-[110px] absolute">
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="border px-3 py-2 rounded-lg"
        >
          <option value="vs-dark">Dark Theme</option>
          <option value="light">Light Theme</option>
        </select>

        {/* FONT SIZE */}
        <select
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          className="border px-3 py-2 rounded-lg"
        >
          <option value={12}>Font 12</option>
          <option value={14}>Font 14</option>
          <option value={16}>Font 16</option>
          <option value={18}>Font 18</option>
          <option value={20}>Font 20</option>
        </select>

      </div>)}
      
        <div className="flex  items-end justify-end gap-20  mr-20  ">
          {snippetId && (
          <button onClick={handleDeleteSnippets} className="p-2  bg-red-600  font-[600] text-white shadow rounded-lg px-10"> Delete Snippet</button>)}
          <div className="flex gap-10">
          <button onClick={()=>setAiResponses(null)} className="p-2  font-[600] text-black shadow rounded-lg w-[100px]"> Run</button>
          
          <p onClick={()=>setShowEditorSettings(!showEditorSettings)} className="bg-white shadow p-2 rounded-full mt-2">{!showEditorSettings?(<Settings/>) :(<Settings2/>)}</p></div>
          </div>
      {/* MONACO EDITOR */}
     
      <CodeEditor
        language={language}
        theme={theme}
        fontSize={fontSize}
        code={code}
        setCode={setCode}
      />
      <div id="output">
      <OutputBox output={output}/>
      </div>
      </div>
      <AIActions  setAiResponses={setAiResponses} code={code} setAiReply={setAiReply} language={language}/>
      <AiResponseLayout   setAiResponses={setAiResponses} aiResponses={aiResponses} aiResponse={aiReply}/>
      </div>
      
      
    </>
  );
};

export default Playground;