import gitHub from "./db";
import gitHubQuery from "./Query";
import { useEffect, useState, useCallback } from "react";
import RepoInfo from './RepoInfo'
import SearchBox from "./SearchBox";

function App() {
  let [userName, setUserName] = useState("");
  let [repoList, setRepoList] = useState(null);
  let [pageCount, setPageCount] = useState(10);
  let [queryString, setQueryString] = useState("");
  let [totalCount, setTotalCount] = useState(null);
  let [startCursor, setStartCursor] = useState(null);
  let [endCursor, setEndCursor] = useState(null);
  let [hasPreviousPage, setHasPreviousPage] = useState(false);
  let [hasNextPage, setHasNextPage] = useState(true);
  let [paginationKeyWord, setPaginationKeyWord] = useState("first");
  let [paginationString, setPaginationString] = useState("");

  const fetchData = useCallback(() => {
    const queryText = JSON.stringify(gitHubQuery(pageCount, queryString, paginationKeyWord, paginationString));

    fetch(gitHub.baseUrl, {
      method: "POST",
      headers: gitHub.headers,
      body: queryText,
    })
      .then((response) => response.json())
      .then((data) => {
        const viewer = data.data.viewer;
        const repos = data.data.search.edges;
        const total = data.data.search.repositoryCount;
        const start = data.data.search.pageInfo?.startCursor;
        const end = data.data.search.pageInfo?.endCursor;
        const next = data.data.search.pageInfo?.hasNextPage;
        const prev = data.data.search.pageInfo?.hasPreviousPage;

        setUserName(viewer.name);
        setRepoList(repos);
        setTotalCount(total);
        setStartCursor(start);
        setEndCursor(end);
        setHasNextPage(next);
        setHasPreviousPage(prev);
      })
      .catch((err) => {
        console.log("eeeeeee", err);
      });
  }, [pageCount, queryString, paginationKeyWord, paginationString]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App container mt-5 ">
      <h1 className="text-primary">
        <i className="bi bi-diagram-2-fill"></i> Repos
      </h1>
      <p>Hey there {userName}</p>
      < SearchBox 
        totalCount={totalCount}
        pageCount={pageCount}
        queryString={queryString}
        onQueryChange={(myString) => {setQueryString(myString)}}
        onTotalChange={(myCount) => {setPageCount(myCount)}}
      />
      {
        repoList && (
          <ul className="list-group list-group-flush" >
            {
              repoList.map((repo) => (
                <RepoInfo key={repo.node.id}  repo={repo.node}/>
              ))
            }
          </ul>
        )
      }
    </div>
  );
}

export default App;
