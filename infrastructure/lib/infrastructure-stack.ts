import * as cdk from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {DockerImageCode, DockerImageFunction} from "aws-cdk-lib/aws-lambda";
import {TarballImageAsset} from "aws-cdk-lib/aws-ecr-assets";
import {RetentionDays} from "aws-cdk-lib/aws-logs";

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const name = 'aws-spring-cloud-function-demo';

    const asset = new TarballImageAsset(this, 'MyBuildImage', {
      tarballFile: '../build/jib-image.tar',
    });

    new DockerImageFunction(this, 'Lambda', {
      code: DockerImageCode.fromEcr(asset.repository, {
        tagOrDigest: asset.imageTag,
      }),
      functionName: name,
      memorySize: 2048,
      timeout: cdk.Duration.minutes(5),
      logRetention: RetentionDays.ONE_DAY,
      environment: {
        MAIN_CLASS: 'com.example.awsspringcloudfunction.AwsSpringCloudFunctionApplication',
      },
    });
  }
}
