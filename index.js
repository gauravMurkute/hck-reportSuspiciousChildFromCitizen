var AWS = require("aws-sdk");

var docClient = new AWS.DynamoDB.DocumentClient();

/**
 * Lambda Entry Point
 */
exports.handler = reportMissingChildFromCitizen

function reportMissingChildFromCitizen(event, context, callback) {


  console.log('event:', JSON.stringify(event))
    console.log('Context: ', JSON.stringify(context))
    var body = JSON.parse(event.body);
    var response = {
                "statusCode": 200,
                "headers": {},
                "body": JSON.stringify(body),
                "isBase64Encoded": false
            }
            
            
    var table = "CITIZEN_REPORTED_CHILDREN";
    
    var citizenId  = body.citizenId;
    var childImgName = body.childImgName;
    var childLastSeenLocation = body.childLastSeenLocation;




var params = {
    TableName:table,
    Item:{
        "CITIZEN_ID": citizenId,
        "CHILD_IMG_NAME": childImgName,
        "CHILD_LAST_SEEN_LOC": childLastSeenLocation
     }
};

console.log("Adding a new item...", params.Item);

docClient.put(params, function(err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Added item:", params.Item);
    }
});
    
   return callback(null, response);


}
