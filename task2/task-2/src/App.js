import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/project")
      .then(response => {
        setProjectData(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  if (!projectData) return <div>Loading...</div>;

  return (
    <div>
      <h1>{projectData.title}</h1>
      <p>{projectData.description}</p>

      <div>
        {projectData.tasks.map(task => (
          <div key={task.task_id}>
            <h2>{task.task_title}</h2>
            <p>{task.task_description}</p>

            <div>
              {task.assets.map(asset => (
                <div key={asset.asset_id}>
                  <h3>{asset.asset_title}</h3>
                  <p>{asset.asset_description}</p>
                  {asset.asset_content_type === "video" ? (
                    <iframe src={asset.asset_content} title={asset.asset_title}></iframe>
                  ) : asset.asset_content_type === "article" ? (
                    <a href={asset.asset_content} target="_blank" rel="noopener noreferrer">Read more</a>
                  ) : (
                    <input placeholder="Enter Text Here" />
                  )}
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
