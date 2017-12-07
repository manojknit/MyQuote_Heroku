'use strict';
console.log('Loading worker function');
var request = require('xhr-request');
const aws = require('aws-sdk');
const stepfunctions = new aws.StepFunctions();
const ses = new aws.SES();
exports.handler = (event, context, callback) => {
    

//Create Step Function instance - Start
var API_Key = process.env.MONGO_API_KEY;
var status = "Submit";
var urlReq = "https://api.mlab.com/api/1/databases/quotedb/collections/quote_tables?q={'quote_status':'"+status+"'}&apiKey="+API_Key;
//console.log('urlReq= '+urlReq);
request(urlReq, {
    json: true
  }, function (err, data) {
    if (err) throw err;
    // the JSON result 
   // console.log('data = '+ JSON.stringify(data).trim());
    var responsedata = data;// JSON.parse(JSON.stringify(data).trim());
    
    for (var key in responsedata) {
      //if (responsedataobj.hasOwnProperty(key)) {
          var quoteid = responsedata[key].quote_id;
          var quoteDesc = responsedata[key].quote_name;
          var emailIds = 'manojsjsu@gmail.com';
          var inputToStepFunc = "{ \"quoteid\": \"" + quoteid + "\", \"quoteName\" : \"" + quoteDesc + "\", \"managerEmailAddress\" : \"" + emailIds + "\" }";
          var nameunique = quoteid + "_WF";
          var workflowParams = {
            stateMachineArn: 'arn:aws:states:us-east-1:494875521123:stateMachine:MyQuoteApprovalWorkFlow',
            input: inputToStepFunc, name: nameunique
        };
          stepfunctions.startExecution(workflowParams, function(err, data) {
            if (err) {
                console.log(err, err.stack);
                console.log('An error occured in starting workflow for QuoteId= '+quoteid);
            } else {
                    // No activities scheduled
                    console.log('Started workflow for Quote= '+quoteid);
                }
          });
    }
  });
//Create Step Function instance - End

//Email send
    var taskParams = {
        activityArn: 'arn:aws:states:us-east-1:494875521123:activity:MyQuotePMApprovalStep'
    };
    
    stepfunctions.getActivityTask(taskParams, function(err, data) {
        if (err) {
            console.log(err, err.stack);
            context.fail('An error occured in calling getActivityTask.');
        } else {
            if (data === null) {
                // No activities scheduled
                context.succeed('No activities received after 60 seconds.');
            } else {
                var input = JSON.parse(data.input);
                var emailParams = {
                    Destination: {
                        ToAddresses: [
                            input.managerEmailAddress
                            ]
                    },
                    Message: {
                        Subject: {
                            Data: 'MyQuote: Your Approval Needed for QuoteId# '+ input.quoteid,
                            Charset: 'UTF-8'
                        },
                        Body: {
                            Html: {
                                Data: 'Hi!<br />' +
                                    input.quoteName + ' requires your approval!<br />' +
                                    'Can you please approve:<br />' +
                                    'https://rivi7zpw05.execute-api.us-east-1.amazonaws.com/respond/approve?taskToken=' + encodeURIComponent(data.taskToken) + "&quoteid=" + input.quoteid + '<br />' +
                                    'Or reject:<br />' +
                                    'https://rivi7zpw05.execute-api.us-east-1.amazonaws.com/respond/reject?taskToken=' + encodeURIComponent(data.taskToken)+ "&quoteid=" + input.quoteid,
                                Charset: 'UTF-8'
                            }
                        }
                    },
                    Source: input.managerEmailAddress,
                    ReplyToAddresses: [
                            input.managerEmailAddress
                        ]
                };
                    
                ses.sendEmail(emailParams, function (err, data) {
                    if (err) {
                        console.log(err, err.stack);
                        context.fail('Internal Error: The email could not be sent.');
                    } else {
                        console.log(data);
                        context.succeed('The email was successfully sent.');
                    }
                });
            }
        }
    });
};