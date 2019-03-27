import { useState, useEffect, useReducer, createContext, useContext } from 'react';
import { getDataFromUrl } from './githubService';

const ServerDataContext = createContext({});

export const ServerDataContextProvider = ServerDataContext.Provider;

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

export const useDataApi = (initialUrl) => {
  console.log('useDataApiFired');
  const [url, setUrl] = useState(initialUrl);

  const serverData = useContext(ServerDataContext);
  let data = null;
  if (serverData.dataFetcher.getIsDataReady()) {
    console.log('server-side data fetched');
    data = serverData.dataFetcher.fetchedData[url];
  } else if (serverData.isServer) {
    console.log('server-side data is being fetched');
    serverData.dataFetcher.fetchUrl(initialUrl);
  }

  const [state, dispatch] = useReducer(dataFetchReducer, {
    data: data || [],
    isLoading: false,
    isError: false
  });

  useEffect(() => {
    console.log('GithubRepos UseEffect fired');
    console.log(`url:${url}`);
    console.log(`data:${data}`);
    

    if (data) {
      dispatch({ type: FETCH_SUCCESS, payload: { data }});
      return;
    }

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
  }, [url, data]);

  const refreshData = (url) => {
    setUrl(url);
  };

  return {...state, refreshData};
};
