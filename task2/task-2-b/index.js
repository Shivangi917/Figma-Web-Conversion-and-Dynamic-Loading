const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Project = require("./models/Project");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/projectDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

app.get("/api/project", async (req, res) => {
  try {
    const project = await Project.findOne({ slug: "2085/technical-project-management" });
    if (!project) {
      return res.status(404).send("Project not found");
    }
    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching project data");
  }
});

// Start the server
app.listen(5000, () => console.log("Server running on http://localhost:5000"));