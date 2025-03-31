import * as cdk from 'aws-cdk-lib'
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import { ProjectMetadata } from '../../../global/Global';
import { customResourceNamingHook } from '../../../global/NamingHook';

interface DataStackProps extends cdk.StackProps{
    metadata : ProjectMetadata
}

export class DataStack extends cdk.Stack {
    constructor(scope : Construct, id : string, props? : DataStackProps){
        super(scope, id, props)

    new Table(this, 'spaces-tb', {
        tableName: customResourceNamingHook(this, props.metadata, 'spaces-tb'),
        partitionKey: {
            name: 'id',
            type: AttributeType.STRING
        }
    })        

    }
}