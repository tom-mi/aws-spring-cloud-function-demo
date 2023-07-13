#!/bin/bash

set -eu

# invoke lambda function 'aws-spring-cloud-function-demo'
FUNCTION_NAME=aws-spring-cloud-function-demo
aws lambda invoke --function-name $FUNCTION_NAME --cli-binary-format raw-in-base64-out --payload '{"name": "World"}' output.txt

cat output.txt
