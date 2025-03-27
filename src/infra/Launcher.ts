import { App } from "aws-cdk-lib";
import { DataStack } from "./stacks/data/DataStack";

const app = new App()

new DataStack(app, 'DataStack')