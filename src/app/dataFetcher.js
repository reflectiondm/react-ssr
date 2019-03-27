import { useState, useEffect, useReducer } from 'react';
import { getDataFromUrl } from './githubService';

const FETCH_INIT = 'FETCH_INIT';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_FAILED = 'FETCH_FAILED';


const dataFetchReducer = (state, action) => {
  switch(action.type) {
  case FETCH_INIT: {
    return {...state, isLoading: true, isError: false};
  }
  case FETCH_SUCCESS: {
    return {...state, isLoading: false, isError: false, data: action.payload.data};
  }
  case FETCH_FAILED: {
    return {...state, isLoading: false, isError: true};
  }
  }
};

export const useDataApi = (initialUrl, initialData) => {
  console.log('useDataApiFired');

  const [url, setUrl] = useState(initialUrl);
  const [state, dispatch] = useReducer(dataFetchReducer, {
    data: initialData,
    isLoading: false,
    isError: false
  });

  useEffect(() => {
    console.log('GithubRepos UseEffect fired');

    const fetchData = async () => {
      try {
        dispatch({ type: FETCH_INIT});
        const data = await getDataFromUrl(url);
        dispatch({ type: FETCH_SUCCESS, payload: { data }});
      } catch (err) {
        dispatch({ type: FETCH_FAILED});
      }
    };

    fetchData();
  }, [url]);

  const refreshData = (url) => {
    setUrl(url);
  };

  return {...state, refreshData};
};
