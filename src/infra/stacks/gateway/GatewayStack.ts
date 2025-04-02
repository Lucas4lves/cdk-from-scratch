import * as cdk from 'aws-cdk-lib'
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import { ProjectMetadata } from '../../../global/Global';

interface GatewayStackProps extends cdk.StackProps {
    spacesIntegration : LambdaIntegration 
}

export class GatewayStack extends cdk.Stack{
    constructor(scope : Construct, id : string, props? : GatewayStackProps){
        super(scope, id, props)

        const api = new RestApi(this, 'restApi')
        const baseResource = api.root.addResource('spaces')

        baseResource.addMethod('GET', props.spacesIntegration)
        baseResource.addMethod('POST', props.spacesIntegration)

    }
}