'use strict';
var request = require('xhr-request');
exports.handler = (event, context, callback) => {
    console.log('Event Starting Event string=' + JSON.stringify(event));
    //console.log('event='+JSON.stringify(event, null, 2));
    var input = JSON.parse(JSON.stringify(event).trim());
    
    var quoteid = input.quoteid;
    console.log('quoteid = ' + quoteid);
    
    var API_Key = process.env.MONGO_API_KEY;
    
    //console.log('API Key= '+API_Key);
    var urlReq = "https://api.mlab.com/api/1/databases/quotedb/collections/quote_tables?q={'quote_id':"+quoteid+"}&apiKey="+API_Key;
    //console.log('urlReq= '+urlReq);
    request(urlReq, {
        json: true
      }, function (err, data) {
        if (err) throw err
        // the JSON result 
        console.log('data = '+data[0].quote_status)
      })
      
    //update
    if(input.action.toString() === 'approve')
    {
        var urlUpdate = "https://api.mlab.com/api/1/databases/quotedb/collections/quote_tables?apiKey="+API_Key+"&q={'quote_id':"+quoteid+"}"; 
        request(urlUpdate, {
          method: 'PUT',
          json: true,
          body: { "$set" : { "quote_status" : "approved" } },
          responseType: 'arraybuffer'
        }, function (err, data) {
          if (err) throw err
          console.log('got ArrayBuffer result: ', data)
        })
    }
    else //Reject
    {
        var urlUpdateR = "https://api.mlab.com/api/1/databases/quotedb/collections/quote_tables?apiKey="+API_Key+"&q={'quote_id':"+quoteid+"}"; 
        request(urlUpdateR, {
          method: 'PUT',
          json: true,
          body: { "$set" : { "quote_status" : "rejected" } },
          responseType: 'arraybuffer'
        }, function (err, data) {
          if (err) throw err
          console.log('Got ArrayBuffer result: ', data)
        })
    }
    
    console.log('Completed');
    //console.log('activityArn'+context+'output= '+input);
    //callback(null, "Promo# "+ input.quoteid+ " is approved");
    callback(null, "Quote# "+ quoteid + " is approved");
}