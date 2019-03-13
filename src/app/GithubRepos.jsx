import React, {useState, useEffect} from 'react';
import { fetchReposByUser } from './githubService';



export default function GithubRepos({ user }) {
  const [query, setQuery] = useState(user);
  const [search, setSearch] = useState(user);
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('GithubRepos UseEffect fired');

    const fetchData = async () => {
      setIsLoading(true);
      const data = await fetchReposByUser(search);
      setRepos(data);
      setIsLoading(false);
    };

    fetchData();
  }, [search]);

  console.log('GithubRepos rendered');

  return (
    <>
      <input type="text" value={query} onChange={e => setQuery(e.target.value)}></input>
      <button onClick={() => setSearch(query)}>Go!</button>
      {isLoading ? <div>It is loading</div> : 
        <ul>
          {repos.map(repo => <li key={repo.name}>{repo.name}</li>)}
        </ul>
      }  
    </>
  );
}
