import superagent from 'superagent';

export const fetchReposByUser = (user) => superagent
  .get(`https://api.github.com/users/${user}/repos`)
  .then(res => {
    console.log('data received');
    return res.body;
  });
