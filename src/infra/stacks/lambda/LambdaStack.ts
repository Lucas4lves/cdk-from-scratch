import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs';
import { Code, Runtime } from 'aws-cdk-lib/aws-lambda';
import path = require('path');
import { ProjectMetadata } from '../../../global/Global';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';

interface LambdaStackProps extends cdk.StackProps{
    //TODO
    stackSlug : string
    spacesTable : ITable
    functionSlug : string
    metadata : ProjectMetadata
}

export class LambdaStack extends cdk.Stack {
    private functionSlug : string
    public readonly spacesIntegration : LambdaIntegration

    constructor(scope : Construct, id : string, props? : LambdaStackProps){
        super(scope, id, props)
        this.initialize()

        const spacesLambda = new NodejsFunction(this, "SpacesLambda", {
            functionName: `lf-${props.metadata.name}-${this.functionSlug}`,
            runtime: Runtime.NODEJS_22_X,
            handler: 'handler',
            entry: path.join(__dirname, '..', '..', '..', 'services', 'spaces','handler.ts'),
            environment : {
                TABLE_NAME : props.spacesTable.tableName!
            }
        })
        
        spacesLambda.addToRolePolicy(new PolicyStatement({

            effect: Effect.ALLOW,
            actions: [
                's3:ListAllMyBuckets',
                's3:ListBucket'
            ],
            resources: ["*"]
        }))

        spacesLambda.addToRolePolicy( new PolicyStatement({
            effect: Effect.ALLOW,
            resources: [
                props.spacesTable.tableArn
            ],
            actions: [
                "dynamodb:PutItem"
            ]
        }))

        this.spacesIntegration = new LambdaIntegration(spacesLambda)
    }
    private initialize(){
        this.functionSlug = cdk.Fn.select(4, cdk.Fn.split('-', this.stackId))
    }
}