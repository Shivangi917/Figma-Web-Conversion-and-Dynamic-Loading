import React, { useEffect, useState } from "react";
import axios from "axios";
import parse from "html-react-parser";
import './index.css'

const App = () => {
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/project")
      .then((response) => {
        setProjectData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  if (!projectData) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="main-header">{projectData.title}</h1>
      <div className="image-and-des">
      {projectData.project_image && (
        <img src={projectData.project_image} alt={projectData.title} style={{ width: "800px", borderRadius: "10px" }} />
      )}
      <div className="description">{parse(projectData.description)}</div>
      </div>

      <div className="task-container">
        {projectData.tasks.map((task) => (
          <div key={task.task_id}>
            <h2 className="task-title">{task.task_title}</h2>
            <div className="task-des">{parse(task.task_description)}</div>

            <div className="asset-container">
            {task.assets.map((asset) => (
              <div className="asset" key={asset.asset_id}>
                <h3 className="asset-title">{asset.asset_title}</h3>
                <div className="asset-des">{parse(asset.asset_description)}</div>
                {asset.asset_content_type === "video" && asset.asset_content ? (
                  <iframe 
                    src={asset.asset_content} 
                    title={asset.asset_title} 
                    width="560" 
                    height="315" 
                    allowFullScreen
                  ></iframe>
                ) : asset.asset_content_type === "article" && asset.asset_content ? (
                  <a 
                    href={asset.asset_content} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Read more
                  </a>
                ) : asset.asset_content_type === "threadbuilder" ? (
                  <textarea 
                    placeholder="Write key threads here..." 
                    rows="4"
                    style={{ width: "560", padding: "8px" }}
                  />
                  ) : asset.asset_content_type === "article" &&    !asset.asset_content ? (
                    <textarea 
                      placeholder="Write your article here..." 
                      rows="6"
                      style={{ width: "100%", padding: "8px" }}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
