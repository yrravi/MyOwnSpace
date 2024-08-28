import * as cdk from 'aws-cdk-lib';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';


export class CiCdStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'AwsomePipeline',{
      pipelineName : 'AwsomePipeline',
      synth : new ShellStep('synth',{
        input : CodePipelineSource.gitHub('yrravi/MyOwnSpace','master'),
        commands : [
          'cd CDK',
          'npm ci',
          'npm run build',
          'npx cdk synth'
        ],
       
      }),
       //primaryOutputDirectory : 'CDK/cdk.out'
    })
    
  }
}
