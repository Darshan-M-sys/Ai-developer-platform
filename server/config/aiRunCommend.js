const {exec} =require("child_process")
exports.runAi=()=>{
 exec("ollama run deepseek-coder", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error starting AI model: ${error.message}`);
      return;
    } if (stderr) {
      console.error(`AI model stderr: ${stderr}`);
      return;
    }
} );
}
