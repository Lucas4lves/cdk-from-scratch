import { APIGatewayProxyEvent ,APIGatewayProxyResultV2, Context } from "aws-lambda";

async function handler(event : APIGatewayProxyEvent, context: Context) : Promise<APIGatewayProxyResultV2> {

    let msg 

    switch(event.httpMethod){
        case 'GET':
            msg = "GET"
            break
        case 'POST':
            msg = "POST"
            break
    }


    const res : APIGatewayProxyResultV2 = {
        statusCode: 200,
        body: JSON.stringify(msg)
    }

    console.log(event)

    return res 
}

export { handler }