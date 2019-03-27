import superagent from 'superagent';
import { getGithubUserUrl } from './urlService';

export const fetchReposByUser = (user) => getDataFromurl(getGithubUserUrl(user));
  
export const getDataFromurl = (url) => superagent
  .get(url)
  .then(res => {
    console.log('data received');
    return res.body;
  });
