import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent ,APIGatewayProxyResultV2, Context } from "aws-lambda";
import { v4 } from "uuid";


export async function PostSpaces(event : APIGatewayProxyEvent, dynamoClient: DynamoDBClient) : Promise<APIGatewayProxyResultV2> {
    const randomUuid = v4()
    const item  = JSON.parse(event.body)

    item.id = randomUuid

    const res = await dynamoClient.send(new PutItemCommand({
        TableName: process.env.TABLE_NAME,
        Item: {
            id: {
                S: item.id
            },
            location : {
                S: item.location
            }
        }
    }))

    console.log(res)

    return  {
        statusCode: 201,
        body: JSON.stringify({ id: randomUuid })
    }
}