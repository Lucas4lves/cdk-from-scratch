import * as cdk from 'aws-cdk-lib'
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

interface GatewayStackProps extends cdk.StackProps {
    helloLambdaIntegration : LambdaIntegration
}

export class GatewayStack extends cdk.Stack{
    constructor(scope : Construct, id : string, props? : GatewayStackProps){
        super(scope, id, props)

        const api = new RestApi(this, 'restApi')
        const baseResource = api.root.addResource('spaces')

        baseResource.addMethod('GET', props.helloLambdaIntegration)

    }
}