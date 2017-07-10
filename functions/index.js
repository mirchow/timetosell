const functions = require('firebase-functions');
const admin = require('firebase-admin');
const _ = require('lodash');
const googleStocks = require('google-stocks');


admin.initializeApp(functions.config().firebase);
const db = admin.database();

function convertToArray(objGroup) {
  const newArray = []
  if (!objGroup) {
    return newArray
  }
  _.forEach(objGroup, (eachObj, index) => {
    eachObj.id = index
    newArray.push(eachObj)
  })
  return newArray
}

function preparePricesForDB(stocksFromDB, googlePrices, userKey) {
  let result = {}
  stocksFromDB.map(stock => {
    const updatedStockFromGoogle = googlePrices.filter(googlePrice => {
      return googlePrice.t === stock.symbol
    });
console.log('Prices from Google', userKey, JSON.stringify(updatedStockFromGoogle));
    const lastPrice = updatedStockFromGoogle[0] ? updatedStockFromGoogle[0].l : 1;
    const highestPrice = stock.lastPrice > stock.highestPrice ? stock.lastPrice : stock.highestPrice;
    const gain =  _.round(((100 * stock.lastPrice ) / stock.purchasePrice) - 100, 2)
    const currentTreshold = _.round(((1 - (stock.lastPrice / highestPrice)) * 100),2)
console.log(userKey,'highestPrice', highestPrice, 'lastPrice', lastPrice, 'gain', gain, 'currentTreshold', currentTreshold)
    result[`stocks/${stock.id}/lastPriceTimeStamp`] = new Date().toISOString();
    result[`stocks/${stock.id}/lastPrice`] = lastPrice;
    result[`stocks/${stock.id}/highestPrice`] = highestPrice
    result[`stocks/${stock.id}/gain`] = gain
    result[`stocks/${stock.id}/currentTreshold`] = currentTreshold
  })
  return result;
}

function getPricesFromGoogle(snapStocks, userKey) {

  const stocksFromDB = convertToArray(snapStocks.val());
  const stocksSymbols = stocksFromDB.map(stock => {
    return stock.symbol
  });
  // console.log('stocksArray', userKey, stocksFromDB);
  console.log('stocksSymbols', userKey, stocksSymbols);

  googleStocks([stocksSymbols])
    .then(function (data) {
      const result = preparePricesForDB(stocksFromDB, data, userKey)
      db.ref(`users/${userKey}`).update(result);
      console.log('stocks updated', userKey, result);
    })
    .catch(function (error) {
      console.error('google-error', userKey, stocksSymbols, error);
      // if (error.code !== 'ECONNRESET') {
        db.ref(`users/${userKey}/errors`).push().set({
          error,
          errorTimeStamp: new Date().toISOString()
        });
      // }

    });
}


exports.updateStocks = functions.https.onRequest((req, res) => {

  db.ref('users').once('value', snapUser => {
    _.keys(snapUser.val()).forEach(userKey => {

      // console.log('===>USER:', userKey);
      db.ref('users').child(`${userKey}/stocks`).once('value', snapStocks => {
        getPricesFromGoogle(snapStocks, userKey);
      });
      // console.log('===>USER-END:', userKey);

    });
  });

  res.send("Hello from Firebase!");
});

// // Listens for new messages added to /messages/:pushId/original and creates an
// // uppercase version of the message to /messages/:pushId/uppercase
// // exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
// //   .onWrite(event => {
// //     // Grab the current value of what was written to the Realtime Database.
// //     const original = event.data.val();
// //     console.log('Uppercasing', event.params.pushId, original);
// //     const uppercase = original.toUpperCase();
// // // You must return a Promise when performing asynchronous tasks inside a Functions such as
// // // writing to the Firebase Realtime Database.
// // // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
// //     return event.data.ref.parent.child('uppercase').set(uppercase);
// //   });
//
//
//
// // Take the text parameter passed to this HTTP endpoint and insert it into the
// // Realtime Database under the path /messages/:pushId/original
// exports.addMessage = functions.https.onRequest((req, res) => {
//   // Grab the text parameter.
//   const original = req.query.text;
//   // Push it into the Realtime Database then send a response
//   admin.database().ref('/messages').push({original: original}).then(snapshot => {
//     // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
//     res.redirect(303, snapshot.ref);
//   });
// });
//
// // Listens for new messages added to /messages/:pushId/original and creates an
// // uppercase version of the message to /messages/:pushId/uppercase
// exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
//   .onWrite(event => {
//     // Grab the current value of what was written to the Realtime Database.
//     const original = event.data.val();
//     console.log('Uppercasing', event.params.pushId, original);
//     const uppercase = original.toUpperCase();
//     // You must return a Promise when performing asynchronous tasks inside a Functions such as
//     // writing to the Firebase Realtime Database.
//     // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
//     return event.data.ref.parent.child('uppercase').set(uppercase);
//   });