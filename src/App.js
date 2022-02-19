import gitHub from "./db";
import gitHubQuery from "./Query";
import { useEffect, useState, useCallback } from "react";
import RepoInfo from './RepoInfo'

function App() {
  let [userName, setUserName] = useState("");
  let [repoList, setRepoList] = useState(null);

  const fetchData = useCallback(() => {
    fetch(gitHub.baseUrl, {
      method: "POST",
      headers: gitHub.headers,
      body: JSON.stringify(gitHubQuery),
    })
      .then((response) => response.json())
      .then((data) => {
        const viewer = data.data.viewer;
        const repos = data.data.search.nodes

        setUserName(viewer.name);
        setRepoList(repos);
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

      {
        repoList && (
          <ul className="list-group list-group-flush" >
            {
              repoList.map((repo) => (
                <RepoInfo key={repo.id}  repo={repo}/>
              ))
            }
          </ul>
        )
      }
    </div>
  );
}

export default App;
