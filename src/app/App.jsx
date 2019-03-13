import React from 'react';
import Greater from './Greeter';
import Counter from './Counter';
import GithubRepos from './GithubRepos';

function App() {
  return (
    <>
      <Greater />
      <Counter />
      <GithubRepos user={'reflectiondm'} />
    </>
  );
}

export default App;
