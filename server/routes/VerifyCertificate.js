const express= require("express");
const { verifyCertificates } = require("../controllers/CertificateVerified");
const verifyCertificate= express.Router();
verifyCertificate.post("/verify",verifyCertificates)
module.exports=verifyCertificate;