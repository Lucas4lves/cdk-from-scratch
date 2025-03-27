import { App } from "aws-cdk-lib";
import { DataStack } from "./stacks/data/DataStack";
import { LambdaStack } from "./stacks/lambda/LambdaStack";
import { ProjectMetadata } from "../global/Global";
import { GatewayStack } from "./stacks/gateway/GatewayStack";

const app = new App()
const project_metadata : ProjectMetadata = {
    name: "cdk-basics",
    maintainers: ["Lucas Alves"]
}

new DataStack(app, 'DataStack')
const lambdaStack = new LambdaStack(app, 'LambdaStack', {
    stackSlug: "lambda-stack",
    functionSlug: "",
    metadata: project_metadata
})

new GatewayStack(app,'GatewayStack', {
    helloLambdaIntegration: lambdaStack.helloIntegration
})