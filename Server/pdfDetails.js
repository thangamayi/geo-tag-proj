const mongoose = require("mongoose");

const pdfDetailsSchema =new mongoose.Schema(
    {
        pdf:String,
        title:String,
    },
    {
        collation:"pdfDetails"
    }
);
mongoose.model("pdfDetails",pdfDetailsSchema);