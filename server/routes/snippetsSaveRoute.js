const express=require("express");
const isAuthenticated =require("../middlewares/authMiddleware")
const { saveSnippets, getSingleSnippets, getAllSnippets,updateSnippets, deleteSnippets } = require("../controllers/codeSnippets");
const snippetsSaveRouter= express.Router();
snippetsSaveRouter.post("/save",isAuthenticated,saveSnippets);
snippetsSaveRouter.get("/all",isAuthenticated,getAllSnippets);
snippetsSaveRouter.get("/single/:snippetsId",isAuthenticated,getSingleSnippets);
snippetsSaveRouter.put("/update/:snippetsId",isAuthenticated,updateSnippets);
snippetsSaveRouter.delete("/delete/:snippetsId",isAuthenticated,deleteSnippets);
module.exports=snippetsSaveRouter;