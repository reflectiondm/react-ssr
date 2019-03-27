import React, { useState } from 'react';
import { getGithubUserUrl } from './urlService';
import { useDataApi } from './useDataApiHook';


export default function GithubRepos({ user }) {
  const [query, setQuery] = useState(user);
  const url = getGithubUserUrl(query);
  const { data, isError, isLoading, refreshData} = useDataApi(url);

  console.log('GithubRepos rendered');

  return (
    <>
    <form onSubmit={e => {
      refreshData(url);
      e.preventDefault();
    }}>
      <input type="text" value={query} onChange={e => setQuery(e.target.value)}></input>
      <button type="submit">Go!</button>
    </form>
      <RepoList repos={data} isError={isError} isLoading={isLoading} />
    </>
  );
}

function RepoList({repos, isLoading, isError}) {
  if (isError) {
    return <div>There was an error :( </div>;
  }

  if (isLoading) {
    return <div>It is loading</div>;
  }

  return (
    <ul>
      {repos.map(repo => <li key={repo.name}>{repo.name}</li>)}
    </ul>
  );
}
