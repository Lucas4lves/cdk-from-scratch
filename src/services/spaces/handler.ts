import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent ,APIGatewayProxyResultV2, Context } from "aws-lambda";
import { PostSpaces } from "./POST/PostSpaces";

const dynamoDbClient = new DynamoDBClient({

})

async function handler(event : APIGatewayProxyEvent, context: Context) : Promise<APIGatewayProxyResultV2> {

    let msg 

    try{
        switch(event.httpMethod){
            case 'GET':
                msg = "GET"
                break
            case 'POST':
                const res = PostSpaces(event, dynamoDbClient)
                return res;
        }
    }catch(err){
        return {
            statusCode: 500,
            body: JSON.stringify(err)
        }
    }

    


    const res : APIGatewayProxyResultV2 = {
        statusCode: 200,
        body: JSON.stringify(msg)
    }

    console.log(event)

    return res 
}

export { handler }