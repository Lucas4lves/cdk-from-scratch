import { App } from "aws-cdk-lib";
import { DataStack } from "./stacks/data/DataStack";
import { LambdaStack } from "./stacks/lambda/LambdaStack";
import { ProjectMetadata } from "../global/Global";
import { GatewayStack } from "./stacks/gateway/GatewayStack";
import { stackNamingHook, customResourceNamingHook } from "../global/NamingHook";

const app = new App()
const project_metadata : ProjectMetadata = {
    name: "cdk-basics",
    maintainers: ["Lucas Alves"],
    squad: "devops"
}

new DataStack(app, stackNamingHook(project_metadata,"data"), {
    metadata : project_metadata,
})
const lambdaStack = new LambdaStack(app, stackNamingHook(project_metadata,"lambda"), {
    stackSlug: "lambda-stack",
    functionSlug: "",
    metadata: project_metadata
})

new GatewayStack(app,stackNamingHook(project_metadata,"rest-api"), {
    helloLambdaIntegration: lambdaStack.helloIntegration
})