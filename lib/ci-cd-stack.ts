import * as cdk from 'aws-cdk-lib';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { pipeline } from 'stream';
import { PipelineStage } from './PipelineStage';


export class CiCdStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'AwsomePipeline',{
      pipelineName : 'AwsomePipeline',
      synth : new ShellStep('synth',{
        input : CodePipelineSource.gitHub('yrravi/MyOwnSpace','master'),
        commands : [
          'npm ci',
          'npm run build',
          'npx cdk synth'
        ],
         primaryOutputDirectory : 'cdk.out'
      }),
       
      
    })
    const testStage = pipeline.addStage(new PipelineStage(this,'PipelineStage',{
      stageName : 'TestStage'
    }))
    
  }
}
