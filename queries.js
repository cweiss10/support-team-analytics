//packages for search and insights
import algoliasearch from 'algoliasearch';
import aa from 'search-insights';

//retreive queries and userTokens
import data from './searchTerms.json'
import userTokens from './userTokens.json'

//instantiate the search client
const client = algoliasearch('5EKAXRY6GM', '42249e838b6024ad52b2eb57f1f5ad14');

// instantiate the insights client
aa('init', {
  appId: '5EKAXRY6GM',
  apiKey: '42249e838b6024ad52b2eb57f1f5ad14'
})

//instantiate the index
const index = client.initIndex('fashion_products')

//send a bunch of queries and events (starting with 100)
for (let i = 0; i < 100; i++) {

  // randomize the userToken we send
  var userTokenCursor = Math.floor(Math.random() * 10);
  var userTokenQuery = userTokens.userTokens[userTokenCursor] + "";

  //randomize the query we send
  var queryCursor = Math.floor(Math.random() * 51)
  var query = data.queries[queryCursor]
  console.log(query)


  //randomize the click position we send --maybe this is a bad idea?
  var position = Math.floor(Math.random() * 10);


  index.search(query, {
    clickAnalytics: true,
    hitsPerPage: 10,
    userToken: userTokenQuery
  }).then(({ hits, queryID }) => {
    if (hits[position]) {
      aa('clickedObjectIDsAfterSearch', {
        userToken: userTokenQuery,
        eventName: 'cats test click event',
        index: 'fashion_products',
        objectIDs: [hits[position].objectID],
        queryID: queryID,
        positions: [position]
      });
    }
  });
}
