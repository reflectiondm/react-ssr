import React, {useState, useEffect} from 'react';
import { fetchReposByUser } from './githubService';
import { getGithubUserUrl } from './urlService';


export default function GithubRepos({ user }) {
  const [query, setQuery] = useState(user);
  const [url, setUrl] = useState(getGithubUserUrl(user));
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    console.log('GithubRepos UseEffect fired');

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchReposByUser(url);
        setRepos(data);
        setIsLoading(false);
        setIsError(false);
      } catch (err) {
        setIsLoading(false);
        setIsError(true);
      }
    };

    fetchData();
  }, [url]);

  const refreshData = () => {
    setUrl(getGithubUserUrl(query));
  };

  console.log('GithubRepos rendered');

  return (
    <>
    <form onSubmit={e => {
      refreshData();
      e.preventDefault();
    }}>
      <input type="text" value={query} onChange={e => setQuery(e.target.value)}></input>
      <button type="submit">Go!</button>
    </form>
      <RepoList repos={repos} isError={isError} isLoading={isLoading} />
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
