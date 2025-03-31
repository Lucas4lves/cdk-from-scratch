import { v4 } from "uuid";
import { APIGatewayProxyEvent, APIGatewayProxyResultV2, Context } from "aws-lambda";
import { S3Client, ListBucketsCommand } from '@aws-sdk/client-s3'


const client = new S3Client({})

async function handler(event : APIGatewayProxyEvent, context: Context){

    const cmd = new ListBucketsCommand()
    const lsBucketRes = (await client.send(cmd)).Buckets

    const res : APIGatewayProxyResultV2 = {
        body: JSON.stringify({
            msg: JSON.stringify("Hi from lambda! " + JSON.stringify(lsBucketRes)),
            dummy_id: v4()
        }),
        statusCode: 200
    }

    console.log(event)

    return res
}

export { handler }