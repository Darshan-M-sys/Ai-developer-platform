const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");

exports.runCode = async (req, res) => {
  try {
    const { code, language } = req.body;
    const fileName = "tempCode";
    /* ==============================
       JAVASCRIPT RUNNER
    ============================== */
    if (language === "javascript") {
      const filePath = path.join(__dirname, `${fileName}.js`);
      fs.writeFileSync(filePath, code);
      exec(`node ${filePath}`, (error, stdout, stderr) => {
        if (error) return res.json({ output: stderr });
        return res.json({ output: stdout });
      });
    }

   
    /* ==============================
       PYTHON RUNNER
    ============================== */
    else if (language === "python") {
      const filePath = path.join(__dirname, `${fileName}.py`);
      fs.writeFileSync(filePath, code);

      exec(`python ${filePath}`, (error, stdout, stderr) => {
        if (error) return res.json({ output: stderr });
        return res.json({ output: stdout });
      });
    }

    /* ==============================
       C++ RUNNER
    ============================== */
    else if (language === "cpp") {
      const filePath = path.join(__dirname, `${fileName}.cpp`);
      fs.writeFileSync(filePath, code);

      exec(
        `g++ ${filePath} -o ${fileName} && ${fileName}`,
        (error, stdout, stderr) => {
          if (error) return res.json({ output: stderr });
          return res.json({ output: stdout });
        }
      );
    }
    else {
      res.json({ output: "Language not supported yet" });
    }
  } catch (err) {
    res.json({ output: "Server error" });
  }
};