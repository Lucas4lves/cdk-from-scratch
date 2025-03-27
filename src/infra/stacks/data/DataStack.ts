import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs';

interface DataStackProps extends cdk.StackProps{
    //TODO
}

export class DataStack extends cdk.Stack {
    constructor(scope : Construct, id : string, props? : DataStackProps){
        super(scope, id, props)

        

    }
}