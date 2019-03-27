import { getDataFromUrl } from './githubService';

export const DataFetcher = (initialData) => {
  if (initialData) {
    return {
      getIsDataReady: () => true,
      fetchedData: initialData,
      fetchUrl: (url) => console.error(`the url ${url} was called when the data is ready`),
      waitForData: () => Promise.resolve().then(() => console.error('waitFrData was called when the data is ready'))
    };
  }

  const fetchCalls = {};

  const fetchedData = {};

  let isDataReady = false;

  const fetchUrl = url =>  fetchCalls[url] = getDataFromUrl(url);

  const waitForData = () => Promise.all(
    Object.keys(fetchCalls).map(key => fetchCalls[key].then(data => fetchedData[key] = data))
  ).then(() => {
    console.log('set is data ready');
    isDataReady = true;
  });


  return { 
    fetchUrl,
    fetchedData,
    waitForData,
    getIsDataReady: () => isDataReady
  };
};
