import { Stack, StackProps } from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { StackDeployment } from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";
import { handler } from "../services/handler";
import { dirname, join } from "path";



interface LamdaStackProps extends StackProps{
    stageName ?: string
}


export class LamdaStack extends Stack{

    constructor(scope : Construct, id:string, props: LamdaStackProps){
        super(scope,id,props)


        new NodejsFunction(this,"Hello-Handler",{
            runtime : Runtime.NODEJS_18_X,
            handler : 'handler',
            entry : (join(__dirname, '..','services','handler.ts')),
            environment : {
                STAGE : props.stageName!
            }
        })
    }

}