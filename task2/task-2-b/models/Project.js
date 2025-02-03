const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  slug: String,
  project_image: String,
  tasks: [{
    task_id: Number,
    task_title: String,
    task_description: String,
    assets: [{
      asset_id: Number,
      asset_title: String,
      asset_description: String,
      asset_content: String,
      asset_type: String,
      asset_content_type: String
    }]
  }]
});

module.exports = mongoose.model("Project", ProjectSchema);