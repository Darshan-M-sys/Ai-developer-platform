const {exec} =require("child_process")
exports.runAi=()=>{
 exec(" ollama run deepseek-coder")
}