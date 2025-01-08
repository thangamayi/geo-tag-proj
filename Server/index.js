const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");

app.use(express.json());
app.use(cors());  // Enable CORS if needed
app.use("/files", express.static("files"));

const mongoUrl = "mongodb://127.0.0.1:27017/admin";  // Ensure correct DB URI
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to the database");
}).catch((e) => {
  console.log("Failed to connect to the database:", e);
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './files');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  }
});

const pdfSchema = new mongoose.Schema({
  title: { type: String, required: true },
  pdf: { type: String, required: true }
});
mongoose.model("pdfDetails", pdfSchema);

const upload = multer({ storage: storage });
const pdfModel = mongoose.model("pdfDetails");

app.post("/upload-files", upload.single("file"), async (req, res) => {
  const title = req.body.title;
  const fileName = req.file.filename;

  if (!title || !fileName) {
    return res.status(400).send({ status: "error", message: "Title or file missing" });
  }

  try {
    await pdfModel.create({ title, pdf: fileName });
    res.send({ status: "ok" });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("success......!");
});

app.get("/get-files", async (req, res) => {
  try {
    const data = await pdfModel.find({});
    res.send({ status: "ok", data });
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
