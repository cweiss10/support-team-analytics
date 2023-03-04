//packages for search and insights
import algoliasearch from 'algoliasearch';
import aa from 'search-insights';
//instantiate the search client
const client = algoliasearch('5EKAXRY6GM', '42249e838b6024ad52b2eb57f1f5ad14');

// instantiate the insights client
aa('init', {
    appId: '5EKAXRY6GM',
    apiKey: '42249e838b6024ad52b2eb57f1f5ad14'
  })

//instantiate the index
const index = client.initIndex('fashion_products')

//a list of 10 random userTokens to ensure we have repeat visitors
var userTokens= [
    1234,
    5678,
    1345,
    5987,
    2345,
    3456,
    5677,
    3986,
    8873,
    9943
]
// randomize the userToken we send
var cursor = Math.floor(Math.random() * 10);

// Search the index and send a click event
var userTokenQuery = userTokens[cursor] +"";
//randomize the position of the click
var position = Math.floor(Math.random() * 20);
index.search('blue shirt', {
    clickAnalytics: true,
    hitsPerPage: 10,
    userToken: userTokenQuery
    }).then(({ queryID }) => {
      aa('clickedObjectIDsAfterSearch', {
        userToken: userTokenQuery, 
        eventName: 'cats test click event',
        index: 'fashion_products',
        objectIDs: ['objectID-1'],
        queryID : queryID,
        positions: [position]
      });
  });
