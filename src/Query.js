const gitHubQuery = {
    query: `
    {
      viewer {
        name
      }
      search(query: "user:asprovskif sort:updated-desc", type: REPOSITORY, first: 10) {
        nodes {
          ... on Repository {
            name
            description
            id
            url
            viewerSubscription
          }
        }
      }
    }
    `,
  };


  export default gitHubQuery;