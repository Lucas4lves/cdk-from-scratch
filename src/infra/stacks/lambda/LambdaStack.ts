import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs';
import { Code, Function as LambdaFunction, Runtime } from 'aws-cdk-lib/aws-lambda';
import path = require('path');
import { ProjectMetadata } from '../../../global/Global';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';

interface LambdaStackProps extends cdk.StackProps{
    //TODO
    stackSlug : string
    functionSlug : string
    metadata : ProjectMetadata
}

export class LambdaStack extends cdk.Stack {
    private functionSlug : string
    public readonly helloIntegration : LambdaIntegration

    constructor(scope : Construct, id : string, props? : LambdaStackProps){
        super(scope, id, props)
        this.initialize()

        const hello = new LambdaFunction(this, "HelloLambda", {
            functionName: `lf-${props.metadata.name}-${this.functionSlug}`,
            runtime: Runtime.NODEJS_22_X,
            handler: 'hello.main',
            code: Code.fromAsset(path.join(__dirname, '..', '..', '..', 'services'))
        })

        this.helloIntegration = new LambdaIntegration(hello)
    }
    private initialize(){
        this.functionSlug = cdk.Fn.select(4, cdk.Fn.split('-', this.stackId))
    }
}