import gitHub from "./db";
import gitHubQuery from "./Query";
import { useEffect, useState, useCallback } from "react";

function App() {
  let [userName, setUserName] = useState("");

  const fetchData = useCallback(() => {
    fetch(gitHub.baseUrl, {
      method: "POST",
      headers: gitHub.headers,
      body: JSON.stringify(gitHubQuery),
    })
      .then((response) => response.json())
      .then((data) => {
        setUserName(data.data.viewer.name);
      })
      .catch((err) => {
        console.log("eeeeeee", err);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App container mt-5 ">
      <h1 className="text-primary">
        <i className="bi bi-diagram-2-fill"></i> Repos
      </h1>
      <p>Hey there {userName}</p>
    </div>
  );
}

export default App;
