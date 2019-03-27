import superagent from 'superagent';
import { getGithubUserUrl } from './urlService';

export const fetchReposByUser = (user) => getDataFromUrl(getGithubUserUrl(user));
  
export const getDataFromUrl = (url) => superagent
  .get(url)
  .then(res => {
    console.log('data received');
    return res.body;
  });
